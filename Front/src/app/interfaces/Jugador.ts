import { Carta } from './Carta';
import { Partida } from './Partida';
export interface Jugador {
  id: number;
  username: string;
  pasword: string;
  cartas: Carta[];
  partidas: Partida[];
}
