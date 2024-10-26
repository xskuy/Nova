// biome-ignore lint/style/useImportType: <explanation>
import { Component, OnInit } from "@angular/core";
import { NavController } from '@ionic/angular';
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
import { RouterModule, Router } from "@angular/router";
// biome-ignore lint/style/useImportType: <explanation>
import { LoginService } from "../services/login.service";
import { User } from "../models/user";
// biome-ignore lint/style/useImportType: <explanation>
import { AlertController } from "@ionic/angular";
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
    private navCtrl: NavController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        console.log('Intentando iniciar sesión con:', email);
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        console.log('Login exitoso:', userCredential);
        
        console.log('Intentando navegar a /tabs');
        await this.router.navigate(['/tabs/tab1']);
        console.log('Navegación completada');
        
      } catch (error: any) {
        console.error('Error completo:', error);
        let errorMessage = 'Ocurrió un error durante el inicio de sesión';
        
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No existe una cuenta con este correo electrónico.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico no es válido.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Esta cuenta ha sido deshabilitada.';
            break;
        }
        
        await this.presentAlert('Error', errorMessage);
      }
    } else {
      if (this.loginForm.get('email')?.hasError('required')) {
        await this.presentAlert('Error', 'Por favor, ingrese su correo electrónico');
      } else if (this.loginForm.get('email')?.hasError('email')) {
        await this.presentAlert('Error', 'Por favor, ingrese un correo electrónico válido');
      } else if (this.loginForm.get('password')?.hasError('required')) {
        await this.presentAlert('Error', 'Por favor, ingrese su contraseña');
      } else if (this.loginForm.get('password')?.hasError('minlength')) {
        await this.presentAlert('Error', 'La contraseña debe tener al menos 6 caracteres');
      }
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
