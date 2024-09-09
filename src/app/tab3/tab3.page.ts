// biome-ignore lint/style/useImportType: <explanation>
import { Component, OnInit } from "@angular/core";
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

@Component({
	selector: "app-tab3",
	templateUrl: "tab3.page.html",
	styleUrls: ["tab3.page.scss"],
	standalone: true,
	imports: [
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
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		IonIcon,
	],
})
export class Tab3Page implements OnInit {
		loginForm!: FormGroup;

		constructor(
			private router: Router,
			private loginService: LoginService,
			private formBuilder: FormBuilder,
			private alertController: AlertController,
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
					const result = await this.loginService.login(new User(username, password));
					console.log("Login successful", result);
					// Redirigir al usuario a la página principal o dashboard
					this.router.navigate(["/tabs/tab1"]);
				} catch (error) {
					console.error("Login failed", error);
					this.presentAlert(
						"Error de login",
						"Credenciales inválidas. Por favor, intente de nuevo.",
					);
				}
			} else {
				this.presentAlert(
					"Formulario inválido",
					"Por favor, complete todos los campos correctamente.",
				);
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