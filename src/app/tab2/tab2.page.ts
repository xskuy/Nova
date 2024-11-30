import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, LogoutButtonComponent, CommonModule, AsistenciaComponent],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {

  result: string = '' 
  

  constructor(
    private asistenciaService: AsistenciaService,
    public alertController: AlertController
  ) {}

  async scanQRCode(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    if (result && result.ScanResult) {
      this.result = result.ScanResult;
      this.asistenciaService.agregarRegistro(this.result)

    }
  }

  clearResult() {
    this.result = '';
  }

  private validateFormat(text: string): boolean {
    const pattern = /^[A-Z0-9]+?\|[A-Z0-9]+?\|[A-Z0-9]+?\|\d{8}$/;
    return pattern.test(text);
  }

  private async showAlert(message: string) {
    // Crea una nueva alerta
    const alert = await this.alertController.create({
      header: 'Error',           // Título de la alerta
      message: message,          // Mensaje que se mostrará
      buttons: ['OK'],           // Botones en la alerta (en este caso solo OK)
    });

    // Muestra la alerta en pantalla
    await alert.present();
  }
}

