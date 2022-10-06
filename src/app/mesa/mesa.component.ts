import { ResultadoEnum } from './../interfaces/resultadoEnum';
import { Croupier } from '../classes/croupier';
import { CartaService } from './../services/carta/carta.service';
import { Component, OnInit } from '@angular/core';
import { Carta } from '../interfaces/carta';
import { Jugador } from '../classes/jugador';
import { Historial } from '../classes/historial';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css'],
})
export class MesaComponent implements OnInit {
  primeraCarga: boolean = true;
  jugador: Jugador = new Jugador();
  croupier: Croupier = new Croupier();
  resultado: ResultadoEnum = ResultadoEnum.NULO;
  juegoEnCurso: boolean = false;
  yaRepartio: boolean = false;

  constructor(public cartaService: CartaService) {
    this.comenzarNuevoJuego();
  }

  ngOnInit(): void {}

  async obtenerNombreJugador() {
    let nombre: any = '';
    while (nombre === '') {
      if (this.primeraCarga)
        await Swal.fire({
          title: 'Nueva partida',
          text: 'Ingrese su nombre para comenzar',
          input: 'text',
          icon: 'question',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'green',
          inputValidator: (value) => (!value ? 'Ingresa un nombre' : null),
          allowEscapeKey: false,
          allowOutsideClick: false,
        }).then((r) => (nombre = r.value || ''));
      // nombre =
      //   prompt('Ingrese su nombre para comenzar una nueva partida') || '';
      else {
        await Swal.fire({
          title: 'Nueva partida',
          text: 'Ingrese su nombre para comenzar',
          input: 'text',
          icon: 'question',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'green',
          showCancelButton: true,
          cancelButtonColor: 'red',
          inputValidator: (value) => (!value ? 'Ingresa un nombre' : null),
          allowEscapeKey: false,
          allowOutsideClick: false,
        }).then((r) => (nombre = r.value));
      }
    }
    if (nombre != null) {
      this.jugador.nombre = nombre;
    }
    this.primeraCarga = false;
    return nombre;
  }

  async comenzarNuevoJuego() {
    if ((await this.obtenerNombreJugador()) === null) return;
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
    this.resultado = ResultadoEnum.NULO;
    this.juegoEnCurso = true;
    this.yaRepartio = false;
  }

  async repartir() {
    this.comenzarNuevaMano();
    await this.pedirCartaJugador();
    this.pedirCartaCroupier();
    await this.pedirCartaJugador();
    this.pedirCartaCroupier();
    await this.validarManoJugador();
    if (this.resultado === ResultadoEnum.NULO) this.yaRepartio = true;
  }

  async pedirCartaJugador() {
    this.jugador.cartas.push(this.cartaService.getCarta());
    if (this.jugador.cartas.length > 2) {
      await this.validarManoJugador();
    }
    this.jugador.cartas.forEach((carta) => {
      carta.url = `../../assets/${carta.palo.toLowerCase()}_${carta.numOLetra.toLocaleLowerCase()}.png`;
    });
  }

  pedirCartaCroupier() {
    const carta = this.cartaService.getCarta();
    this.croupier.cartas.push(carta);
    if (this.croupier.cartas.length === 1) {
      this.actualizarPuntajeCroupier();
    }
    if (this.croupier.cartas.length === 2) {
      this.ocultarCartaCroupier();
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

  async validarManoJugador() {
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
      await this.finalizarJuego();
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
      } else {
        //2 puntajes iguales
        this.resultado = ResultadoEnum.EMPATE;
      }
    }
  }

  plantarse() {
    this.validarManoCroupier();
    this.finalizarJuego();
  }

  async finalizarJuego() {
    this.juegoEnCurso = false;
    this.yaRepartio = false;
    if (this.resultado === ResultadoEnum.EMPATE) {
      this.empate();
    }
    if (this.resultado === ResultadoEnum.VICTORIA_JUGADOR) {
      this.victoriaJugador();
    }
    if (this.resultado === ResultadoEnum.VICORIA_CROUPIER) {
      this.derrotaJugador();
    }
    await Swal.fire({
      title: this.resultado,
      icon:
        this.resultado === ResultadoEnum.VICORIA_CROUPIER ? 'error' : 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'green',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  }

  ocultarCartaCroupier() {
    this.croupier.cartas[1].url = '../../assets/dada_vuelta.png';
    this.revelarCarta(this.croupier.cartas[0]);
  }

  revelarCarta(carta: Carta) {
    carta.url = `../../assets/${carta.palo}_${carta.numOLetra}.png`;
  }
}
