import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule, 
  ]
})
export class NotasPage {
  // Definir el tipo de cardStates con un índice de tipo 'string'
  cardStates: { [key: string]: boolean } = {
    card1: false,
    card2: false,
    card3: false
  };

  // Método para alternar el estado de una tarjeta específica
  toggleCard(card: string) {
    this.cardStates[card] = !this.cardStates[card];
  }
}


