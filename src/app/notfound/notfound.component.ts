import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonBackButton
  ]
})
export class NotfoundComponent {
  constructor(private router: Router) {}

  nextpage() {
    this.router.navigate(['/tabs/tab1']);
  }
}
