import { Carta } from './Carta';
import { Jugador } from './Jugador';

export interface Partida {
  id: number;
  jugador: Jugador;
  cartas: Carta[];
  resultado: ResultadoEnum;
}
export enum ResultadoEnum {
  VICTORIA_JUGADOR = 'Victoria Jugador',
  VICTORIA_CROUPIER = 'Victoria Croupier',
  EMPATE = 'Empate',
}
