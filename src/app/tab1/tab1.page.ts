import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ProfileService, UserProfile } from '../services/profile.service';
import {
  IonHeader,
  IonToolbar,
  IonAvatar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonAvatar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon
  ],
})
export class Tab1Page implements OnInit {
  userProfile: UserProfile | null = null;
  greeting: string = '';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService
  ) {
    this.updateGreeting();
  }

  async ngOnInit() {
    await this.loadUserProfile();
    // Actualizar el saludo cada minuto
    setInterval(() => this.updateGreeting(), 1200000);
  }

  private async loadUserProfile() {
    try {
      console.log('Cargando perfil de usuario...');
      this.userProfile = await this.profileService.getProfile();
      console.log('Perfil cargado:', this.userProfile);
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  private updateGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Buenos días';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'Buenas tardes';
    } else {
      this.greeting = 'Buenas noches';
    }
  }

  getUserFirstName(): string {
    return this.userProfile?.name || 'Usuario';
  }
}
