import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private afAuth: AngularFireAuth
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async submit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      try {
        console.log('Intentando enviar email de recuperación a:', email);
        await this.afAuth.sendPasswordResetEmail(email);
        console.log('Email de recuperación enviado exitosamente');
        this.presentAlert('Éxito', 'Se ha enviado un correo de recuperación a su dirección de email.');
        // Opcional: redirigir al usuario a la página de login
        // this.router.navigate(['/login']);
      } catch (error: any) {
        console.error('Error al enviar email de recuperación:', error);
        let errorMessage = 'No se pudo enviar el correo de recuperación.';
        
        // Mensajes de error más específicos
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No existe una cuenta con este correo electrónico.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'El formato del correo electrónico no es válido.';
        }
        
        this.presentAlert('Error', errorMessage);
      }
    } else {
      this.presentAlert('Error', 'Por favor, ingrese un email válido.');
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
}
