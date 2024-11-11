// asistencia.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private asistencia: string[] = []; // Almacena registros de asistencia

  agregarRegistro(registro: string) {
    this.asistencia.push(registro);
  }

  obtenerRegistros() {
    return this.asistencia;
  }

  limpiarRegistros() {
    this.asistencia = [];
  }
}
