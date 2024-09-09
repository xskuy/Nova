import { Component, type OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonButton,
} from "@ionic/angular/standalone";
import { RouterModule } from "@angular/router";
// biome-ignore lint/style/useImportType: <explanation>
import { Router } from "@angular/router";
@Component({
	selector: "app-registro",
	templateUrl: "./registro.page.html",
	styleUrls: ["./registro.page.scss"],
	standalone: true,
	imports: [
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		RouterModule,
    IonButton
	],
})
export class RegistroPage implements OnInit {
	constructor(private router: Router) {}

	goToTabs() {
		this.router.navigate(["/tabs/tab3"]);
	}
	ngOnInit() {
		console.log("RegistroPage initialized");
	}
}
