export interface Carta {
  numOLetra: string;
  palo: PaloEnum;
  estado: EstadoCartaEnum;
  valor: number;
  url: string;
}
export enum PaloEnum {
  CORAZON = 'corazon',
  PICA = 'pica',
  DIAMANTE = 'diamante',
  TREBOL = 'trebol',
}

export enum EstadoCartaEnum {
  EN_JUEGO,
  EN_MAZO,
}
