import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private registros: string[] = [];

  agregarRegistro(qr: string): void {
    this.registros.push(qr);
  }

  obtenerRegistros(): string[] {
    return this.registros;
  }
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
      return null; // Devuelve null si el formato es incorrecto
    }
  }
}
