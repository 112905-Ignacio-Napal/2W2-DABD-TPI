import { Carta } from '../interfaces/carta';

export class Jugador {
  nombre: string;
  puntajeMano: number;
  cartas: Carta[];

  constructor() {
    this.nombre = "";
    this.puntajeMano = 0;
    this.cartas = [];
  }
}
