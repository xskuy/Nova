// biome-ignore lint/style/useImportType: <explanation>
import { Component, OnInit } from "@angular/core";
import { NavController } from '@ionic/angular';
// biome-ignore lint/style/useImportType: <explanation>
import {
	ReactiveFormsModule,
	FormGroup,
	FormControl,
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
} from "@ionic/angular/standalone";
import { RouterModule } from "@angular/router";
// biome-ignore lint/style/useImportType: <explanation>
import { Router } from "@angular/router";
// biome-ignore lint/style/useImportType: <explanation>
import { LoginService } from "../services/login.service";
import { User } from "../models/user";
// biome-ignore lint/style/useImportType: <explanation>
import { AlertController } from "@ionic/angular";
import { IonicModule } from "@ionic/angular";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent  implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private navCtrl: NavController,
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


