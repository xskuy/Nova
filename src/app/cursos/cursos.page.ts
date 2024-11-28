import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBackButton} from '@ionic/angular/standalone';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  standalone: true,
  imports: [IonicModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBackButton, ]
})
export class CursosPage implements OnInit {
  username: string | null = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    const loggedUser = this.loginService.getCurrentUserValue();
    this.username = loggedUser ? loggedUser.email : null;
  }

  getUserFirstName(): string {
    return this.username ? this.username.split('@')[0] : '';
  }

}
