import { PaloEnum, EstadoCartaEnum } from '../interfaces/carta';

const numerosExistentes = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

const palosExistentes = Object.values(PaloEnum);

export const cartas = palosExistentes
  .map((palo) => {
    return numerosExistentes.map((numero) => {
      let valor: number[] = [];
      if (isNaN(Number.parseInt(numero))) {
        if (numero === 'A') {
          valor.push(1);
          valor.push(11);
        } else {
          valor.push(10);
        }
      } else {
        valor.push(Number.parseInt(numero));
      }

      return {
        numOLetra: numero,
        palo: palo,
        estado: EstadoCartaEnum.EN_MAZO,
        valor: valor,
        url: `../../assets/${palo.toLowerCase()}_${numero.toLowerCase()}.png`,
      };
    });
  })
  .flat(1);
