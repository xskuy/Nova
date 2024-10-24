import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service"; // Asegúrate de que esta ruta sea correcta
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-logout-button',
  template: `
    <ion-button (click)="logout()">Cerrar Sesión</ion-button>
  `,
  styles: [`
    ion-button {
       margin-left: 85%; /* Mueve el botón a la derecha */
      --background: blue; /* Cambia el color de fondo a rojo */
      --color: white; /* Cambia el color del texto a blanco */
      --border-radius: 5px;/* Cambia el color del texto a blanco */
  }
  `],
  standalone: true,
  imports: [IonicModule],
})
export class LogoutButtonComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  async logout() {
    await this.loginService.logout(); // Llama a tu método de logout
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}

