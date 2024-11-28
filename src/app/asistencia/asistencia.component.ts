import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AsistenciaService } from '../services/asistencia.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-asistencia',
  standalone: true,  // Asegúrate de que esté configurado como standalone
  imports: [
    IonicModule,       // Importa IonicModule para habilitar los componentes ion-*
    CommonModule 
  ],
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  registros: string[] = [];
  username: string = ''; 
  currentDate: string = '' ;
  asignatura: string = ''; 
  seccion: string = '';
  sala: string = '';
  fecha: string = '';
  registrosProcesados: { asignatura: string; seccion: string; sala: string; fecha: string }[] = [];
  
  

  constructor(
    private asistenciaService: AsistenciaService,
    private loginService: LoginService

  ) {}

  ngOnInit() {
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const loggedUser = this.loginService.getCurrentUserValue();
    this.registros = this.asistenciaService.obtenerRegistros();
    this.username = loggedUser ? loggedUser.email : null;
    this.currentDate = `${hours}:${minutes} en la fecha de: ${day}-${month}-${year}`;
    this.cargarRegistros();
    
  }
  

  getUserFirstName(): string {
    return this.username ? this.username.split('@')[0] : '';
  }
  cargarRegistros(): void {
    const registrosQR = this.asistenciaService.obtenerRegistros(); // Obtenemos las cadenas del servicio
    this.registrosProcesados = registrosQR
      .map((qr) => this.asistenciaService.procesarQRCode(qr)) // Procesamos cada registro QR
      .filter((registro): registro is { asignatura: string; seccion: string; sala: string; fecha: string } => registro !== null); // Filtramos los registros no válidos
  }
  
  


}