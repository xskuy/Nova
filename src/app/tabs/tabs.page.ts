import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, logInOutline, homeOutline, qrCode } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterModule]
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  
  constructor(private router: Router) {
    addIcons({homeOutline, qrCode,logInOutline,ellipse,});
    
  }

  logRoute(tab: string) {
    console.log(`Navegando a: ${this.router.url}`);
    console.log(`Tab seleccionada: ${tab}`);
  }
}
