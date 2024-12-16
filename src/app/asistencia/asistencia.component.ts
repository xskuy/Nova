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
  registrosProcesados: { asignatura: string; seccion: string; sala: string; fecha: string }[] = [];
  username: string = ''; 
  currentDate: string = '';

  constructor(
    private asistenciaService: AsistenciaService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.initCurrentDate();
    this.setCurrentUser();
    this.cargarRegistrosProcesados();
  }

  private initCurrentDate(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentDate = `${hours}:${minutes} en la fecha de: ${day}-${month}-${year}`;
  }

  private setCurrentUser(): void {
    const loggedUser = this.loginService.getCurrentUserValue();
    this.username = loggedUser ? loggedUser.email : '';
  }

  cargarRegistrosProcesados(): void {
    this.registrosProcesados = this.asistenciaService.RegistrosProcesados();
    console.log('Registros cargados:', this.registrosProcesados);
  }

  getUserFirstName(): string {
    return this.username ? this.username.split('@')[0] : '';
  }
}