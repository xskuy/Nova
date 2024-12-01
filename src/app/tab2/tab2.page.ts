
import { IonicModule, AlertController, Platform } from '@ionic/angular'
import { Component } from '@angular/core'
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
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
    if (!this.platform.is('hybrid')) {
      await this.showAlert(
        'Esta función solo está disponible en dispositivos móviles',
      )
      return
    }

    try {
      // Pedir permiso primero
      const granted = await BarcodeScanner.requestPermissions()

      if (granted.camera === 'granted') {
        // Iniciar el escaneo
        const { barcodes } = await BarcodeScanner.scan()

        if (barcodes.length > 0) {
          this.result = barcodes[0].rawValue.trim()

          if (this.validateFormat(this.result)) {
            this.asistenciaService.agregarRegistro(this.result)
          } else {
            await this.showAlert('El formato del código QR no es válido')
          }
        }
      } else {
        await this.showAlert('Se necesitan permisos de cámara para escanear')
      }
    } catch (error) {
      console.error('Error scanning QR code:', error)
      await this.showAlert('Error al escanear el código QR')
    }
  }

  clearResult() {
    this.result = ''
  }

  private validateFormat(text: string): boolean {
    const pattern = /^[A-Z0-9]+?\|[A-Z0-9]+?\|[A-Z0-9]+?\|\d{8}$/
    return pattern.test(text)
  }

  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    })
    await alert.present()
  }
}
