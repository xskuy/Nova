import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonAvatar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from "ionicons";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonAvatar,  // <-- Add IonAvatar here
    ExploreContainerComponent,
    RouterModule
  ],
})
export class Tab1Page {
  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor() {}
}
