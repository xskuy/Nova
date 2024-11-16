import { IonicModule, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { CommonModule } from '@angular/common';
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
  result: string = '';

  constructor(
    private asistenciaService: AsistenciaService,
    private alertController: AlertController
  ) {}

  async scanQRCode(): Promise<void> {
    await BarcodeScanner.checkPermission({ force: true });
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL,
    });
  
    if (result && result.ScanResult) {
      this.result = result.ScanResult.trim();
  
      // Validar el formato del QR escaneado
      if (this.validateFormat(this.result)) {
        this.asistenciaService.agregarRegistro(this.result); // Agregar al servicio
      } else {
        await this.showAlert('El formato del código QR no es válido');
      }
    }
  }

  clearResult() {
    this.result = ''; // Limpiar el resultado para ocultar el contenedor
  }

  // Método para validar el formato <ASIGNATURA>|<SECCION>|<SALA>|<FECHA> en formato AAAAMMDD
  private validateFormat(text: string): boolean {
    // Nueva expresión regular para <ASIGNATURA>|<SECCION>|<SALA>|<FECHA> en formato AAAAMMDD
    const pattern = /^[A-Z0-9]+?\|[A-Z0-9]+?\|[A-Z0-9]+?\|\d{8}$/;
    return pattern.test(text);
  }

  // Método para mostrar alerta en caso de error de formato
  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

