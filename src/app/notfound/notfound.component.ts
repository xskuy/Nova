import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonImg, IonItem, IonLabel, IonButton]
})

export class NotfoundComponent   {

  constructor(private route: Router) { }

  nextpage() {
    this.route.navigate(['/home']);
  }

}
