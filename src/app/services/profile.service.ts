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
  career: string;
  semester: string;
  campus: string;
  program: string;
  period: string;
  createdAt?: Date;
  avatar: string;
  lastLogin?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private cachedProfile: UserProfile | null = null;

  constructor(
    private afs: AngularFirestore,
    private loginService: LoginService
  ) {}

  async saveProfile(profile: Partial<UserProfile>): Promise<void> {
    console.log('Intentando guardar perfil:', profile);
    
    if (!profile.uid) {
      throw new Error('No user ID provided');
    }

    try {
      await this.afs.doc(`users/${profile.uid}`).set({
        ...profile,
        createdAt: new Date()
      });
      console.log('Perfil guardado exitosamente');
      this.cachedProfile = profile as UserProfile;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }

  async updateProfile(profile: Partial<UserProfile>): Promise<void> {
    const user = this.loginService.getCurrentUserValue();
    if (!user?.uid) {
      throw new Error('No user logged in');
    }

    try {
      await this.afs.doc(`users/${user.uid}`).update({
        ...profile,
        updatedAt: new Date()
      });
      
      if (this.cachedProfile) {
        this.cachedProfile = {
          ...this.cachedProfile,
          ...profile
        };
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async getProfile(): Promise<UserProfile | null> {
    const user = this.loginService.getCurrentUserValue();
    if (!user?.uid) return null;

    try {
      const doc = await this.afs.doc(`users/${user.uid}`).get().toPromise();
      if (doc?.exists) {
        const data = doc.data() as UserProfile;
        this.cachedProfile = data;
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  }

  async generateStudentId(): Promise<string> {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const semester = month < 6 ? 'A' : 'B';
    const sequence = Math.floor(1000 + Math.random() * 9000);
    return `${year}-${semester}-${sequence}`;
  }
} 