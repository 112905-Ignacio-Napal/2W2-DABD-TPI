export interface Carta {
  numOLetra: string;
  palo: PaloEnum;
  valor: number;
  url: string;
}
export enum PaloEnum {
  CORAZON = 'corazon',
  PICA = 'pica',
  DIAMANTE = 'diamante',
  TREBOL = 'trebol',
}
