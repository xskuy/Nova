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
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
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
		RouterModule  // Necesario para formularios reactivos
	],
})
export class Tab3Page implements OnInit {
  formularioLogin: FormGroup;

	constructor(public fb: FormBuilder) {
		this.formularioLogin = this.fb.group({
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", Validators.required),
		});
	}

	ngOnInit() {
		// Initialization logic goes here
		console.log("LoginPage initialized");
	}

}
