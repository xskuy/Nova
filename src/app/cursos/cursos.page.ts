import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonBackButton,
  IonButtons,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  peopleOutline 
} from 'ionicons/icons';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonBackButton,
    IonButtons,
    IonIcon
  ]
})
export class CursosPage implements OnInit {
  username: string | null = '';

  constructor(private loginService: LoginService) {
    addIcons({
      'person-outline': personOutline,
      'people-outline': peopleOutline
    });
  }

  ngOnInit() {
    const loggedUser = this.loginService.getCurrentUserValue();
    this.username = loggedUser ? loggedUser.email : null;
  }

  getUserFirstName(): string {
    return this.username ? this.username.split('@')[0] : '';
  }
}
