import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { LoginService } from "../services/login.service"; // Asegúrate de que el servicio tenga el método logout
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      try {
        const result = await this.loginService.login(username, password);
        if (result) {
          console.log('Login successful');
          this.router.navigate(['/tabs/tab1']);
        } else {
          console.log('Login failed');
          this.presentAlert('Error', 'Credenciales inválidas');
        }
      } catch (error) {
        console.error('Login error', error);
        this.presentAlert('Error', 'Ocurrió un error durante el inicio de sesión');
      }
    } else {
      this.presentAlert('Error', 'Por favor, complete todos los campos.');
    }
  }

  async logout() {
    try {
      await this.loginService.logout(); // Asegúrate de que tu servicio tenga este método
      console.log('Logout successful');
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error('Logout error', error);
      this.presentAlert('Error', 'Ocurrió un error al cerrar sesión');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }
}

