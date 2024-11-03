import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from './login.service';

export interface UserProfile {
  uid: string;
  email: string | null;
  name: string;
  lastName: string;
  age: number;
  phone?: string;
  studentId: string;
  semester: string;
  program: string;
  campus: string;
  period: string;
  career: string;
  avatar?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private afs: AngularFirestore,
    private loginService: LoginService
  ) {}

  // Agregar este método para generar matrícula
  async generateStudentId(): Promise<string> {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const semester = month < 6 ? 'A' : 'B'; // A para primer semestre, B para segundo

    try {
      // Obtener el último número de matrícula del año actual
      const snapshot = await this.afs
        .collection<UserProfile>('users', ref => 
          ref.where('studentId', '>=', `${year}-${semester}`)
            .where('studentId', '<=', `${year}-${semester}-9999`)
            .orderBy('studentId', 'desc')
            .limit(1)
        )
        .get()
        .toPromise();

      let sequence = 1;
      if (snapshot && !snapshot.empty) {
        const lastDoc = snapshot.docs[0].data() as UserProfile;
        const lastId = lastDoc.studentId;
        const lastSequence = parseInt(lastId.split('-')[2]);
        sequence = lastSequence + 1;
      }

      // Formatear el número secuencial a 4 dígitos
      const sequenceFormatted = sequence.toString().padStart(4, '0');
      return `${year}-${semester}-${sequenceFormatted}`;
    } catch (error) {
      console.error('Error generating student ID:', error);
      throw error;
    }
  }

  // Crear o actualizar perfil de usuario
  async saveProfile(profile: Partial<UserProfile>): Promise<void> {
    const user = this.loginService.getCurrentUserValue();
    if (!user?.uid) throw new Error('No user logged in');

    try {
      await this.afs.doc(`users/${user.uid}`).set({
        ...profile,
        uid: user.uid,
        email: user.email,
        updatedAt: new Date()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }

  // Obtener perfil de usuario
  async getProfile(): Promise<UserProfile | null> {
    const user = this.loginService.getCurrentUserValue();
    if (!user?.uid) return null;

    try {
      const doc = await this.afs.doc(`users/${user.uid}`).get().toPromise();
      if (doc?.exists) {
        return doc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  }

  // Actualizar campos específicos del perfil
  async updateProfile(updates: Partial<UserProfile>): Promise<void> {
    const user = this.loginService.getCurrentUserValue();
    if (!user?.uid) throw new Error('No user logged in');

    try {
      await this.afs.doc(`users/${user.uid}`).update({
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
} 