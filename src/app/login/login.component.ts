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
import { AngularFireAuth } from '@angular/fire/compat/auth';


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
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Verificar si ya hay una sesión activa
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/tabs/tab1']);
      }
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        if (result.user) {
          console.log('Login exitoso');
          await this.router.navigate(['/tabs/tab1']);
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
