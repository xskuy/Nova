// horario.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  timeOutline, 
  locationOutline, 
  personOutline,
  arrowBackOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardContent,
    IonIcon
  ]
})
export class HorarioPage {
  selectedDay = '0';
  days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
  
  schedule: { [key: string]: any[] } = {
    '0': [ // Lunes
      {
        time: "8:30 - 9:50",
        subject: "Desarrollo Móvil",
        room: "Lab 305",
        professor: "C. Martínez",
        color: "primary",
        emoji: "📱"
      },
      {
        time: "10:00 - 11:20",
        subject: "Base de Datos",
        room: "Lab 401",
        professor: "B. Mora",
        color: "secondary",
        emoji: "💾"
      }
    ],
    '1': [ // Martes
      {
        time: "11:30 - 12:50",
        subject: "Arquitectura",
        room: "Sala 203",
        professor: "A. Silva",
        color: "tertiary",
        emoji: "🏗️"
      }
    ]
  };

  constructor() {
    addIcons({
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'person-outline': personOutline,
      'arrow-back-outline': arrowBackOutline
    });
  }

  segmentChanged(event: any) {
    this.selectedDay = event.detail.value;
  }
}