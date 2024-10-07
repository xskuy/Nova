// biome-ignore lint/style/useImportType: <explanation>
import { Component, OnInit } from "@angular/core";
// biome-ignore lint/style/useImportType: <explanation>
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
} from "@ionic/angular/standalone";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"],
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
		ReactiveFormsModule,  // Necesario para formularios reactivos
	],
})
export class LoginPage implements OnInit {
	formularioLogin: FormGroup;

	constructor(public fb: FormBuilder) {
		this.formularioLogin = this.fb.group({
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", Validators.required),
		})
	}

	ngOnInit() {
		// Initialization logic goes here
		console.log("LoginPage initialized");
	}
}