import { Injectable } from '@angular/core';
import { cartas } from 'src/app/constants/baraja';
import { Carta } from 'src/app/interfaces/carta';

@Injectable({
  providedIn: 'root',
})
export class CartaService {
  constructor() {}

  getCarta(): Carta {
    const randomCard = Math.floor(Math.random() * 52);
    return cartas[randomCard];
  }
}
