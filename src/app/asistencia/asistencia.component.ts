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
         // Importa CommonModule para directivas *ngIf y *ngFor
  ],
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  registros: string[] = [];
  username: string = ''; 
  currentDate: string = '' ;
  

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
  }

  getUserFirstName(): string {
    return this.username ? this.username.split('@')[0] : '';
  }
  

  
}


