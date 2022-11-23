import { Carta } from './Carta';
import { Jugador } from './Jugador';

export interface Partida {
  id: number;
  jugador: Jugador;
  cartas: Carta[];
  resultado: ResultadoEnum;
  puntosJugador: number;
  puntosCroupier: number;
}
export enum ResultadoEnum {
  VICTORIA_JUGADOR = 'VICTORIA_JUGADOR',
  VICTORIA_CROUPIER = 'VICTORIA_CROUPIER',
  EMPATE = 'EMPATE',
}
