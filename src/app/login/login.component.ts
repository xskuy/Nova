// biome-ignore lint/style/useImportType: <explanation>
import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Keyboard } from '@capacitor/keyboard';
// biome-ignore lint/style/useImportType: <explanation>
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
// biome-ignore lint/style/useImportType: <explanation>
import { RouterModule, Router } from "@angular/router";
// biome-ignore lint/style/useImportType: <explanation>
import { User } from "../models/user";
// biome-ignore lint/style/useImportType: <explanation>
import { AlertController } from "@ionic/angular";
// biome-ignore lint/style/useImportType: <explanation>
import { LoginService } from "../services/login.service"; // Asegúrate de que el servicio tenga el método logout
import { IonicModule } from "@ionic/angular";
import { addIcons } from 'ionicons';
import { 
  mailOutline, 
  lockClosedOutline, 
  eyeOutline, 
  eyeOffOutline,
  arrowBackOutline 
} from 'ionicons/icons';


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
    IonIcon,
    IonAvatar,
    IonText
  ],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loginService: LoginService,
    private platform: Platform
  ) {
    addIcons({ 
      mailOutline, 
      lockClosedOutline, 
      eyeOutline, 
      eyeOffOutline,
      arrowBackOutline 
    });
  }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.platform.is('ios')) {
      await Keyboard.setAccessoryBarVisible({ isVisible: false });
      await Keyboard.setScroll({ isDisabled: true });
    }
  }

  ionViewWillEnter() {
    if (this.platform.is('ios')) {
      Keyboard.addListener('keyboardWillShow', () => {
        document.body.classList.add('keyboard-is-shown');
      });

      Keyboard.addListener('keyboardWillHide', () => {
        document.body.classList.remove('keyboard-is-shown');
      });
    }
  }

  ionViewWillLeave() {
    if (this.platform.is('ios')) {
      Keyboard.removeAllListeners();
    }
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
