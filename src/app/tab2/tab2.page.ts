import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'; // Aquí el servicio
import { AlertController, IonicModule } from '@ionic/angular';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule, LogoutButtonComponent],
  providers: [BarcodeScanner] // Proveedor del servicio en el componente
})
export class Tab2Page {

  constructor(private barcodeScanner: BarcodeScanner, private alertController: AlertController) {}

  // Función para escanear el código QR
  scanQRCode() {
    const options = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      prompt: 'Coloca el código QR dentro del área de escaneo',
      resultDisplayDuration: 500,
      formats: 'QR_CODE',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Código escaneado:', barcodeData);
      if (barcodeData.cancelled) {
        this.presentAlert('Escaneo cancelado', 'El escaneo fue cancelado.');
      } else {
        this.presentAlert('Código QR Escaneado', 'Contenido: ' + barcodeData.text);
      }
    }).catch(err => {
      console.log('Error', err);
      this.presentAlert('Error', 'No se pudo escanear el código QR.');
    });
  }

  // Mostrar alerta con Ionic
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
