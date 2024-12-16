import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent
  ]
})
export class SchedulePage {
  schedule = [
    {
      id: 'class1',
      className: 'Desarrollo de Aplicaciones Móviles',
      professor: 'Carlos Martinez',
      room: 'Lab 305',
      startTime: '08:30',
      endTime: '10:50',
      code: '012_D'
    },
    {
      id: 'class2',
      className: 'Programación de Base de Datos',
      professor: 'Benjamin Mora',
      room: 'Lab 203',
      startTime: '11:00',
      endTime: '13:20',
      code: '007_BD'
    },
    {
      id: 'class3',
      className: 'Arquitectura de Software',
      professor: 'Emilio Soto',
      room: 'Lab 401',
      startTime: '14:30',
      endTime: '16:50',
      code: 'ASY4131-99A'
    }
  ];
} 