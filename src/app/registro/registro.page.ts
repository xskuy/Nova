import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonBackButton,
  IonItemDivider,
  IonItemGroup,
  IonSelect,
  IonSelectOption,
  IonButtons
} from '@ionic/angular/standalone';

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
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonBackButton,
    IonItemDivider,
    IonItemGroup,
    IonSelect,
    IonSelectOption,
    IonButtons
  ]
})
export class RegistroPage implements OnInit {
  registerForm!: FormGroup;
  campusList = ['Campus Central', 'Campus Norte', 'Campus Sur'];
  careersList = ['Ingeniería Informática', 'Ingeniería Civil', 'Ingeniería Industrial'];
  semestersList = ['1° Semestre', '2° Semestre', '3° Semestre', '4° Semestre', '5° Semestre', '6° Semestre'];
  generatedStudentId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private profileService: ProfileService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.generatedStudentId = await this.profileService.generateStudentId();
    } catch (error) {
      console.error('Error generating student ID:', error);
      this.generatedStudentId = 'Error-0000';
    }

    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      name: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      age: [null, [Validators.required, Validators.min(16), Validators.max(99)]],
      phone: ['', [Validators.pattern('^[0-9]{9}$')]],
      career: [null, Validators.required],
      semester: [null, Validators.required],
      campus: [null, Validators.required]
    }, { validator: this.checkPasswords });

    console.log('Formulario inicializado:', this.registerForm);

    this.registerForm.get('email')?.valueChanges.subscribe(value => {
      console.log('Valor del email cambiado:', value);
    });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    console.log('Validando contraseñas:', {
      password,
      confirmPassword,
      coinciden: password === confirmPassword
    });

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async register() {
    console.log('Iniciando registro...');
    
    if (this.registerForm.valid) {
      try {
        const formData = this.registerForm.value;
        console.log('Datos del formulario:', formData);
        
        console.log('Intentando crear usuario en Firebase Auth...');
        const user = await this.loginService.register(formData.email, formData.password);
        
        if (user) {
          console.log('Usuario creado exitosamente:', user);
          
          const profileData = {
            uid: user.uid,
            email: user.email,
            name: formData.name,
            lastName: formData.lastName,
            age: formData.age,
            phone: formData.phone || '',
            studentId: this.generatedStudentId,
            career: formData.career,
            semester: formData.semester,
            campus: formData.campus,
            program: formData.career,
            period: '2024-A',
            createdAt: new Date(),
            avatar: 'assets/avatar-placeholder.jpg'
          };
          
          console.log('Intentando guardar perfil:', profileData);
          await this.profileService.saveProfile(profileData);
          console.log('Perfil guardado exitosamente');

          const alert = await this.alertController.create({
            header: 'Registro exitoso',
            message: `Tu matrícula es: ${this.generatedStudentId}\nPor favor, guarda este número y verifica tu correo electrónico antes de iniciar sesión.`,
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
        console.error('Error completo:', error);
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
      console.log('Formulario inválido:', {
        valores: this.registerForm.value,
        errores: this.registerForm.errors,
        estadoValidación: this.registerForm.status
      });
      this.checkFormValidity();
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

  checkFormValidity() {
    console.log('Verificando formulario...');
    const emailControl = this.registerForm.get('email');
    console.log('Estado del email:', {
      valor: emailControl?.value,
      válido: emailControl?.valid,
      errores: emailControl?.errors,
      touched: emailControl?.touched,
      dirty: emailControl?.dirty
    });

    const controls = this.registerForm.controls;
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      console.log(`Campo ${key}:`, {
        valor: control.value,
        válido: control.valid,
        errores: control.errors,
        touched: control.touched,
        dirty: control.dirty
      });
    });

    if (!this.registerForm.valid) {
      let errorMessage = 'Por favor, corrige los siguientes errores:\n';
      
      Object.keys(controls).forEach(key => {
        const control = controls[key];
        if (control.errors) {
          console.log(`Error detallado en ${key}:`, control.errors);
          errorMessage += `- ${this.getFieldName(key)}: ${this.getErrorMessage(key)}\n`;
        }
      });
      
      if (this.registerForm.errors?.['passwordMismatch']) {
        console.log('Error en contraseñas:', this.registerForm.errors);
        errorMessage += '- Las contraseñas no coinciden\n';
      }
      
      this.presentAlert('Formulario Incompleto', errorMessage);
    }
  }

  private getFieldName(controlName: string): string {
    const fieldNames: { [key: string]: string } = {
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      name: 'Nombre',
      lastName: 'Apellido',
      age: 'Edad',
      phone: 'Teléfono',
      career: 'Carrera',
      semester: 'Semestre',
      campus: 'Campus'
    };
    return fieldNames[controlName] || controlName;
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.errors && (control.dirty || control.touched)) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['minlength']) {
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['pattern']) {
        if (controlName === 'phone') return 'El teléfono debe tener 9 dígitos';
        return 'Formato inválido';
      }
      if (control.errors['min']) return `Valor mínimo: ${control.errors['min'].min}`;
      if (control.errors['max']) return `Valor máximo: ${control.errors['max'].max}`;
    }
    return '';
  }

  onEmailChange(event: any) {
    const value = event.target.value || event.detail.value;
    console.log('Nuevo valor del email:', value);
    
    this.registerForm.patchValue({
      email: value
    }, { emitEvent: true });

    // Marcar como tocado para que se muestren los errores
    this.registerForm.get('email')?.markAsTouched();
    
    console.log('Estado actualizado del email:', {
      valor: this.registerForm.get('email')?.value,
      válido: this.registerForm.get('email')?.valid,
      errores: this.registerForm.get('email')?.errors,
      touched: this.registerForm.get('email')?.touched
    });
  }

  updateEmail(email: string) {
    this.registerForm.patchValue({
      email: email
    });
    console.log('Email actualizado:', {
      nuevoValor: this.registerForm.get('email')?.value,
      estadoFormulario: this.registerForm.valid
    });
  }

  resetForm() {
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
    });
  }
}
