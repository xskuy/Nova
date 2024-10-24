import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LogoutButtonComponent  } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true, // Indicar que es un componente standalone
  imports: [
    IonicModule,       // Importa IonicModule
    CommonModule,      // Asegúrate de importar módulos comunes de Angular
    FormsModule,       // Si estás usando formularios
    RouterModule,      // Para el enrutamiento
    LogoutButtonComponent 
  ],
})
export class Tab1Page implements OnInit {
  username: string | null = '';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    const loggedUser = this.loginService.getLoggedUser();
    this.username = loggedUser ? loggedUser.username : null;
  }
}


