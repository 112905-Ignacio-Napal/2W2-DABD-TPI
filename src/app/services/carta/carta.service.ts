import { Injectable } from '@angular/core';
import { cartas } from 'src/app/constants/baraja';
import { Carta } from 'src/app/interfaces/carta';

@Injectable({
  providedIn: 'root',
})
export class CartaService {
  cartasEnMazo: Carta[] = [...cartas];


  constructor() {}

  getCarta(): Carta {
    
    const randomNumber = Math.floor(Math.random() * 52);
    this.cartasEnMazo.splice(randomNumber,1);
    
    return cartas[randomNumber];
  }
}
