import { Carta } from '../interfaces/carta';

export class Croupier {
  puntajeMano: number;
  cartas: Carta[];

  constructor() {
    this.puntajeMano = 0;
    this.cartas = [];
  }
}
