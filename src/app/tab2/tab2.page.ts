import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, LogoutButtonComponent,CommonModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {

  result: string = '' 
  

  constructor() {}

  async scanQRCode(): Promise<void> {
    await BarcodeScanner.checkPermission({ force: true });
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
  }

  clearResult() {
    this.result = ''; // Clear the result to hide the result container
  }
}
