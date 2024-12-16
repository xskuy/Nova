import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private registros: string[] = [];

  procesarQRCode(qr: string): { asignatura: string; seccion: string; sala: string; fecha: string } | null {
    const partes = qr.split('|');
    if (partes.length === 4) {
      return {
        asignatura: partes[0],
        seccion: partes[1],
        sala: partes[2],
        fecha: partes[3],
      };
    } else {
      console.error('Formato QR no válido');
      return null;
    }
  }

  RegistrosProcesados(): { asignatura: string; seccion: string; sala: string; fecha: string }[] {
    return this.registros
      .map((qr) => this.procesarQRCode(qr))
      .filter((registro): registro is { asignatura: string; seccion: string; sala: string; fecha: string } => registro !== null);
  }

  agregarRegistro(qr: string): boolean {
    console.log('Intentando registrar QR:', qr);
    if (this.isQRRegistrado(qr)) {
      console.warn('El código QR ya ha sido registrado:', qr);
      return false;
    }
    this.registros.push(qr);
    console.log('Estado actual de registros:', this.registros);
    return true;
  }

  isQRRegistrado(qr: string): boolean {
    return this.registros.includes(qr);
  }

  obtenerRegistros(): string[] {
    return this.registros;
  }
}
