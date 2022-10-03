import { Historial } from './historial';
import { Carta } from '../interfaces/carta';

export class Jugador {
  nombre: string;
  puntajeMano: number;
  cartas: Carta[];
  historial: Historial;

  constructor() {
    this.nombre = '';
    this.puntajeMano = 0;
    this.cartas = [];
    this.historial = new Historial();
  }
}
