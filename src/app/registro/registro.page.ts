import { Component, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
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

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonText,
		ReactiveFormsModule,
  ],
})
export class RegistroPage implements OnInit {
  registerForm!: FormGroup;

	constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  goToTabs() {
    this.router.navigate(['/tabs/tab3'])
  }
  

	checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

	async onSubmit() {
    if (this.registerForm.valid) {
      const { fullName, username, password } = this.registerForm.value;
      try {
        await this.loginService.register(username, password);
        this.presentAlert('Registro exitoso', 'Tu cuenta ha sido creada correctamente.');
        this.router.navigate(['/login']);
      } catch (error) {
        this.presentAlert('Error', 'No se pudo completar el registro. Por favor, intenta de nuevo.');
      }
    } else {
      this.presentAlert('Formulario inválido', 'Por favor, completa todos los campos correctamente.');
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
    // Navega de vuelta a la página de inicio o login
    this.router.navigate(['/tabs/tab1']); // Ajusta esta ruta según tu configuración
  }
}
