import { Component, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonBackButton
} from '@ionic/angular/standalone'
import { RouterModule } from '@angular/router'
// biome-ignore lint/style/useImportType: <explanation>
import { Router } from '@angular/router'
// biome-ignore lint/style/useImportType: <explanation>
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// biome-ignore lint/style/useImportType: <explanation>
import  { AlertController } from '@ionic/angular'
// biome-ignore lint/style/useImportType: <explanation>
import  { LoginService } from '../services/login.service'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonButton,
    IonBackButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText
  ],
})
export class RegistroPage implements OnInit {
  registerForm!: FormGroup;

	constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

	async register() {
    if (this.registerForm.valid) {
      try {
        const { email, password } = this.registerForm.value;
        const user = await this.loginService.register(email, password);
        if (user) {
          const alert = await this.alertController.create({
            header: 'Registro exitoso',
            message: 'Por favor, verifica tu correo electrónico antes de iniciar sesión.',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }]
          });
          await alert.present();
        }
      } catch (error: any) {
        console.error('Error al crear usuario:', error);
        let errorMessage = 'No se pudo crear la cuenta.';
        
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Este correo electrónico ya está registrado.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico no es válido.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'La creación de cuentas está deshabilitada.';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña es demasiado débil.';
            break;
        }
        
        await this.presentAlert('Error', errorMessage);
      }
    } else {
      await this.presentAlert('Error', 'Por favor, completa todos los campos correctamente.');
    }
  }

	async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

	volverAInicio() {
    this.router.navigate(['/login']); 
  }
}
