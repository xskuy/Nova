import { Component, OnInit } from "@angular/core";
import {
	ReactiveFormsModule,
	FormGroup,
	Validators,
	FormBuilder,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonIcon,
	IonAvatar,
	IonText
} from "@ionic/angular/standalone";
import { RouterModule, Router } from "@angular/router";
// biome-ignore lint/style/useImportType: <explanation>
import { User } from "../models/user";
// biome-ignore lint/style/useImportType: <explanation>
import { AlertController } from "@ionic/angular";
import { LoginService } from "../services/login.service"; // Asegúrate de que el servicio tenga el método logout
import { IonicModule } from "@ionic/angular";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Importar todos los componentes de Ionic que necesitas
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAvatar,
    IonText
  ],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const success = await this.loginService.login(email, password);
        if (success) {
          const user = this.loginService.getCurrentUserValue();
          if (user && !user.emailVerified) {
            // Mostrar alerta pero permitir continuar
            const alert = await this.alertController.create({
              header: 'Aviso',
              message: 'Tu email no está verificado. Por favor, verifica tu email cuando puedas.',
              buttons: [{
                text: 'Continuar',
                handler: () => {
                  this.router.navigate(['/tabs/tab1']);
                }
              }]
            });
            await alert.present();
          } else {
            await this.router.navigate(['/tabs/tab1']);
          }
        }
      } catch (error: any) {
        console.error('Error en login:', error);
        let message = 'Error al iniciar sesión';
        
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'No existe una cuenta con este correo.';
            break;
          case 'auth/wrong-password':
            message = 'Contraseña incorrecta.';
            break;
          case 'auth/invalid-email':
            message = 'Correo electrónico inválido.';
            break;
          case 'auth/invalid-credential':
            message = 'Correo o contraseña incorrectos.';
            break;
          default:
            message = 'Error al iniciar sesión. Por favor, intente nuevamente.';
        }
        
        const alert = await this.alertController.create({
          header: 'Error',
          message: message,
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
}
