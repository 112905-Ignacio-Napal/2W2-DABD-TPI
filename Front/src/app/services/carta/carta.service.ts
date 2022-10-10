import { Injectable } from '@angular/core';
import { cartas } from 'src/app/constants/baraja';
import { Carta } from 'src/app/interfaces/carta';

@Injectable({
  providedIn: 'root',
})
export class CartaService {
  private cartasEnMazo: Carta[] = [...cartas];
  constructor() {}

  getCarta(): Carta {
    const cantCartas = this.cartasEnMazo.length;
    const randomNumber: number = Math.floor(Math.random() * cantCartas);
    const randomCard: Carta = this.cartasEnMazo[randomNumber];
    this.cartasEnMazo.splice(randomNumber, 1);
    return randomCard;
  }

  reiniciarJuego() {
    this.cartasEnMazo = [...cartas];
  }
}
