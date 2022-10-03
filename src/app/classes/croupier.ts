import { Historial } from './historial';
import { Carta } from '../interfaces/carta';

export class Croupier {
  puntajeMano: number;
  cartas: Carta[];
  historial: Historial;

  constructor() {
    this.puntajeMano = 0;
    this.cartas = [];
    this.historial = new Historial();
  }
}
