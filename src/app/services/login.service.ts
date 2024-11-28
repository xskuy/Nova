import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Simplificar la suscripción para solo actualizar el estado
    this.afAuth.authState.subscribe(user => {
      this.currentUserSubject.next(user);
    });
    this.currentUser = this.currentUserSubject.asObservable();
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (result.user) {
        console.log('Usuario autenticado:', result.user.email);
        this.currentUserSubject.next(result.user);
        if (!result.user.emailVerified) {
          console.warn('Email no verificado');
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await this.afAuth.signOut();
      this.currentUserSubject.next(null);
      return true;
    } catch (error) {
      console.error('Error en logout:', error);
      return false;
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        await this.sendEmailVerification();
        return result.user;
      }
      return null;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        // Opcional: puedes agregar más validaciones aquí si es necesario
        return !!user;
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  getCurrentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Método para obtener el email del usuario actual
  getLoggedEmail(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.email : null;
  }

  // Método para verificar el email
  async sendEmailVerification(): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.sendEmailVerification();
    }
  }

  // Método para restablecer la contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error al enviar email de recuperación:', error);
      throw error;
    }
  }

  // Método para verificar si el email está verificado
  isEmailVerified(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.emailVerified : false;
  }
}
