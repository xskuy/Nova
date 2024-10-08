import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPage } from './tabs.page';
import { IonicModule } from '@ionic/angular';
import { TabsRoutingModule } from './tabs.routes'; // Corrige esta línea

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabsRoutingModule,
    TabsPage
  ]
})
export class TabsModule {}