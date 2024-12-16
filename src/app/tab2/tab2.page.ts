import { IonicModule, AlertController, Platform } from '@ionic/angular'
import { Component } from '@angular/core'
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';
import { LogoutButtonComponent } from '../logout-button/logout-button.component'
import { CommonModule } from '@angular/common'
import { AsistenciaComponent } from '../asistencia/asistencia.component'

import { AsistenciaService } from '../services/asistencia.service'

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [
    IonicModule,
    LogoutButtonComponent,
    CommonModule,
    AsistenciaComponent,
  ],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  result = ''

  constructor(
    private asistenciaService: AsistenciaService,
    private alertController: AlertController,
    private platform: Platform,
  ) {}

  async scanQRCode(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;

    // Intenta agregar el registro y verifica si fue exitoso
    const registroAgregado = this.asistenciaService.agregarRegistro(this.result);
    if (!registroAgregado) {
      // Si el registro no fue agregado, muestra una alerta indicando que el usuario ya está presente
      await this.showAlert('El usuario ya está presente.');
    }
  }
  
  clearResult() {
    this.result = '';
  }
  

  private validateFormat(text: string): boolean {
    const pattern = /^[A-Z0-9]+?\|[A-Z0-9]+?\|[A-Z0-9]+?\|\d{8}$/
    return pattern.test(text)
  } 

  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
