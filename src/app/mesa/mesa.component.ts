import { ResultadoEnum } from './../interfaces/ResultadoEnum';
import { Croupier } from '../classes/croupier';
import { CartaService } from './../services/carta/carta.service';
import { Component, OnInit } from '@angular/core';
import { Carta } from '../interfaces/carta';
import { Jugador } from '../classes/jugador';
import { Historial } from '../classes/historial';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css'],
})
export class MesaComponent implements OnInit {
  jugador: Jugador = new Jugador();
  croupier: Croupier = new Croupier();
  resultado: ResultadoEnum = ResultadoEnum.EMPATE;
  juegoEnCurso: boolean = false;
  yaRepartio: boolean = false;

  constructor(public cartaService: CartaService) {
    this.jugador.nombre = 'Lionel Messi';
  }

  ngOnInit(): void {
    this.comenzarNuevoJuego();
  }

  capitalize(text: string) {
    return `${text.charAt(0).toUpperCase()}${text.substring(1)}`;
  }

  comenzarNuevoJuego() {
    this.jugador.historial = new Historial();
    this.croupier.historial = new Historial();
    this.comenzarNuevaMano();
  }

  comenzarNuevaMano() {
    this.cartaService.reiniciarJuego();
    this.jugador.cartas = [];
    this.jugador.puntajeMano = 0;
    this.croupier.cartas = [];
    this.croupier.puntajeMano = 0;
    this.resultado = ResultadoEnum.EMPATE;
    this.juegoEnCurso = true;
    this.yaRepartio = false;
  }

  repartir() {
    this.comenzarNuevaMano();
    this.pedirCartaJugador();
    this.pedirCartaCroupier();
    this.pedirCartaJugador();
    this.pedirCartaCroupier();
    this.ocultarCarta(this.croupier.cartas[1]);
    this.yaRepartio = true;
  }

  pedirCartaJugador() {
    this.jugador.cartas.push(this.cartaService.getCarta());
    if (this.jugador.cartas.length > 1) {
      this.validarManoJugador();
    }
  }

  pedirCartaCroupier() {
    const carta = this.cartaService.getCarta();
    this.croupier.cartas.push(carta);
    if (this.croupier.cartas.length === 1) {
      this.actualizarPuntajeCroupier();
    }
  }

  sumarCartas(cartas: Carta[]): number {
    let valorTotal = cartas.reduce((acc, carta) => (acc += carta.valor), 0);
    if (this.tieneAs(cartas)) {
      if (valorTotal + 10 <= 21) {
        valorTotal += 10;
      }
    }
    return valorTotal;
  }

  tieneAs(cartas: Carta[]) {
    return Boolean(cartas.find((carta) => carta.numOLetra === 'A'));
  }

  tieneBlackJack(cartas: Carta[]) {
    return this.sumarCartas(cartas) === 21 && cartas.length === 2;
  }

  victoriaJugador() {
    this.jugador.historial.victorias++;
    this.croupier.historial.derrotas++;
  }
  derrotaJugador() {
    this.jugador.historial.derrotas++;
    this.croupier.historial.victorias++;
  }
  empate() {
    this.jugador.historial.empates++;
    this.croupier.historial.empates++;
  }

  validarManoJugador() {
    this.jugador.puntajeMano = this.sumarCartas(this.jugador.cartas);

    if (this.jugador.puntajeMano === 21) {
      this.plantarse();
    }

    //Se paso de 21
    if (this.jugador.puntajeMano > 21) {
      this.resultado = ResultadoEnum.VICORIA_CROUPIER;
      this.revelarCarta(this.croupier.cartas[1]);
      this.actualizarPuntajeCroupier();
      this.derrotaJugador();
      this.finalizarJuego();
    }
  }

  actualizarPuntajeCroupier() {
    this.croupier.puntajeMano = this.sumarCartas(this.croupier.cartas);
  }

  validarManoCroupier() {
    this.revelarCarta(this.croupier.cartas[1]);
    this.actualizarPuntajeCroupier();
    //El croupier debe plantarse apenas sobrepase los 17 puntos
    while (this.croupier.puntajeMano < 17) {
      this.pedirCartaCroupier();
      this.actualizarPuntajeCroupier();
    }

    const puntajeCroupier = this.croupier.puntajeMano;
    const puntajeJugador = this.jugador.puntajeMano;

    if (
      puntajeCroupier > 21 ||
      (puntajeCroupier <= 21 && puntajeCroupier < puntajeJugador)
    ) {
      this.resultado = ResultadoEnum.VICTORIA_JUGADOR;
    } else if (puntajeCroupier <= 21 && puntajeCroupier > puntajeJugador) {
      //Si no se pasa de 21 y tiene más que el jugador, gana
      this.resultado = ResultadoEnum.VICORIA_CROUPIER;
    } else if (puntajeCroupier === puntajeJugador) {
      if (
        //Si ambos obtuvieron blackjack natural, empate
        this.tieneBlackJack(this.croupier.cartas) &&
        this.tieneBlackJack(this.jugador.cartas)
      ) {
        this.resultado = ResultadoEnum.EMPATE;
      } else if (this.tieneBlackJack(this.croupier.cartas)) {
        //Si los 2 tienen 21, gana el que obtuvo blackjack natural
        this.resultado = ResultadoEnum.VICORIA_CROUPIER;
      } else if (this.tieneBlackJack(this.jugador.cartas)) {
        this.resultado = ResultadoEnum.VICTORIA_JUGADOR;
      }
    }
  }

  plantarse() {
    this.validarManoCroupier();
    this.finalizarJuego();
  }

  finalizarJuego() {
    this.juegoEnCurso = false;
    if (this.resultado === ResultadoEnum.EMPATE) {
      this.empate();
    }
    if (this.resultado === ResultadoEnum.VICTORIA_JUGADOR) {
      this.victoriaJugador();
    }
    if (this.resultado === ResultadoEnum.VICORIA_CROUPIER) {
      this.derrotaJugador();
    }
    alert(this.resultado);
    this.yaRepartio = false;
  }

  ocultarCarta(carta: Carta) {
    carta.url = '../../assets/dada_vuelta.png';
  }

  revelarCarta(carta: Carta) {
    carta.url = `../../assets/${carta.palo}_${carta.numOLetra}.png`;
  }
}
