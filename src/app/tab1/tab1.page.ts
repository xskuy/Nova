import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
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
    LogoutButtonComponent,
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
    IonCardContent,
    IonButton,
    IonIcon
  ],
})
export class Tab1Page implements OnInit {
  username: string | null = '';
  greeting: string = '';

  constructor(private loginService: LoginService) {
    this.updateGreeting();
  }

  ngOnInit() {
    const loggedUser = this.loginService.getCurrentUserValue();
    this.username = loggedUser ? loggedUser.email : null;
    // Actualizar el saludo cada minuto
    setInterval(() => this.updateGreeting(), 1200000);
  }

  private updateGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Night';
    }
  }

  // Obtener solo el nombre del email (antes del @)
  getUserFirstName(): string {
    if (this.username) {
      return this.username.split('@')[0];
    }
    return '';
  }
}
