import { Partida } from './Partida';
export interface Jugador {
  id: number;
  username: string;
  pasword: string;
  partidas: Partida[];
}
