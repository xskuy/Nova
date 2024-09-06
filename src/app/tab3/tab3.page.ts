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
import  { Router } from "@angular/router";

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

	formularioLogin!: FormGroup;

	constructor(private router: Router) {}

	ngOnInit() {
		this.formularioLogin = new FormGroup({
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", Validators.required),
		});
	}

	onSubmit() {
		if (this.formularioLogin.valid) {
			console.log(this.formularioLogin.value);
		} else {
			console.log("Formulario no válido");
		}
	}
}
