import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, LogoutButtonComponent],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {

  result: string = ''

  constructor() {}
  
  async scanQRCode(): Promise<void> {
    const permission = await BarcodeScanner.checkPermission({ force: true });
    if (permission.granted) {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log('Scanned content:', result.content);
      }
    }
  }
}
