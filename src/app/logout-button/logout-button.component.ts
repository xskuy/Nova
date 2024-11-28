import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service"; // Asegúrate de que esta ruta sea correcta
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-button (click)="logout()" size="small" class="logout-btn">
      Cerrar Sesión
    </ion-button>
  `,
  styles: [`
    .logout-btn {
      --background: #dc3545;
      --background-hover: #bb2d3b;
      --color: white;
      --border-radius: 4px;
      --padding-start: 8px;
      --padding-end: 8px;
      --height: 30px;
      --box-shadow: none;
      font-size: 12px;
      width: 95px;
      margin: 0;
    }
  `],
  standalone: true,
  imports: [IonButton]
})
export class LogoutButtonComponent {
  constructor(
    private router: Router, 
    private loginService: LoginService
  ) {}

  async logout() {
    try {
      const success = await this.loginService.logout();
      if (success) {
        await this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  }
}
