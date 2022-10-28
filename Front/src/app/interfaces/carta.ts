export interface Carta {
  simbolo: string;
  palo: PaloEnum;
  valor: number;
  url: string;
  cartaJugador: boolean;
}
export enum PaloEnum {
  CORAZON = 'corazon',
  PICA = 'pica',
  DIAMANTE = 'diamante',
  TREBOL = 'trebol',
}
