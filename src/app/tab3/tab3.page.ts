import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoginService } from '../services/login.service';
import { ProfileService, UserProfile } from '../services/profile.service';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonIcon,
  IonFabButton,
  IonList,
  IonAvatar
} from "@ionic/angular/standalone";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonFabButton,
    IonList,
    IonAvatar
  ],
})
export class Tab3Page implements OnInit {
  
  profile: UserProfile = {
    uid: '',
    name: 'Estudiante',
    lastName: '',
    age: 0,
    email: '',
    avatar: 'assets/avatar-placeholder.jpg',
    studentId: '2024-A-1234',
    semester: '4° Semestre',
    program: 'Ing. Informática',
    campus: 'Campus Central - Edificio A',
    period: '2024-A',
    career: 'Ingeniería Informática'
  };

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      // Intentar cargar el perfil existente
      const savedProfile = await this.profileService.getProfile();
      if (savedProfile) {
        this.profile = savedProfile;
      } else {
        // Si no existe perfil, crear uno nuevo con datos básicos
        const loggedUser = this.loginService.getCurrentUserValue();
        if (loggedUser) {
          this.profile.uid = loggedUser.uid;
          this.profile.email = loggedUser.email;
          this.profile.name = this.getUserFirstName(loggedUser.email);
          // Guardar el perfil inicial
          await this.profileService.saveProfile(this.profile);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  // Método para obtener el nombre del usuario desde el email
  private getUserFirstName(email: string | null): string {
    if (email) {
      return email.split('@')[0];
    }
    return 'Estudiante';
  }

  updateProfilePhoto() {
    console.log('Actualizar foto de perfil');
  }

  async onEditProfile() {
    try {
      // Aquí podrías abrir un modal o navegar a una página de edición
      // Por ahora solo actualizaremos algunos campos de ejemplo
      await this.profileService.updateProfile({
        semester: '5° Semestre', // Ejemplo de actualización
        period: '2024-B'
      });
      console.log('Perfil actualizado');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  async onLogout() {
    try {
      await this.loginService.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
