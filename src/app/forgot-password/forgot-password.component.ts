import { Component } from '@angular/core';
// biome-ignore lint/style/useImportType: <explanation>
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// biome-ignore lint/style/useImportType: <explanation>
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
// biome-ignore lint/style/useImportType: <explanation>
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
    RouterModule,
  ],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

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
      this.loading = true;
      this.error = '';
      const email = this.forgotPasswordForm.value.email;
      
      try {
        await this.afAuth.sendPasswordResetEmail(email);
        this.loading = false;
        this.submitted = true;
      } catch (error: any) {
        this.loading = false;
        
        if (error.code === 'auth/user-not-found') {
          this.error = 'No existe una cuenta con este correo electrónico.';
        } else if (error.code === 'auth/invalid-email') {
          this.error = 'El formato del correo electrónico no es válido.';
        } else {
          this.error = 'No se pudo enviar el correo de recuperación.';
        }
      }
    }
  }
}
