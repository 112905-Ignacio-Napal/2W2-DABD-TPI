import { Croupier } from './../classes/croupier';
import { CartaService } from './../services/carta/carta.service';
import { Component, OnInit } from '@angular/core';
import { Carta } from '../interfaces/carta';
import { Jugador } from '../classes/jugador';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css'],
})
export class MesaComponent implements OnInit {
  juegoEnCurso: boolean = false;
  cartasCroupier: Carta[] = [];
  jugador: Jugador = new Jugador();
  croupier: Croupier = new Croupier();

  constructor(public cartaService: CartaService) {
    this.jugador.nombre = 'Lionel "El 10" Messi';
  }

  ngOnInit(): void {}

  capitalize(text: string) {
    return `${text.charAt(0).toUpperCase()}${text.substring(1)}`;
  }

  iniciarJuego() {
    this.juegoEnCurso = true;
    this.pedirCartaJugador();
    this.pedirCartaCroupier();
    this.pedirCartaJugador();
    this.pedirCartaCroupier();
    this.ocultarCarta(this.croupier.cartas[1]);
  }

  pedirCartaJugador() {
    const cartaObtenida = this.cartaService.getCarta();
    this.jugador.cartas.push(cartaObtenida);
    this.validarManoJugador();
  }

  pedirCartaCroupier() {
    const cartaObtenida = this.cartaService.getCarta();
    this.croupier.cartas.push(cartaObtenida);
  }

  ocultarCarta(carta: Carta) {
    carta.url = '../../assets/dada_vuelta.png';
  }

  revelarCarta(carta: Carta) {
    carta.url = `../../assets/${carta.palo}_${carta.numOLetra}.png`;
  }

  plantarse() {
    this.revelarCarta(this.croupier.cartas[1]);
    const puntajeCroupier = this.croupier.cartas.reduce(
      (acc, carta) => (acc += carta.valor),
      0
    );
  }

  validarManoJugador() {
    this.jugador.puntajeMano = this.jugador.cartas.reduce(
      (acc, carta) => (acc += carta.valor),
      0
    );

    const tieneAs = Boolean(
      this.jugador.cartas.find((carta) => carta.numOLetra === 'A')
    );

    if (tieneAs) {
      if (this.jugador.puntajeMano + 10 < 21) {
        this.jugador.puntajeMano += 10;
      }
    }

    if (this.jugador.puntajeMano > 21) {
      alert('Perdiste Lio');
      this.juegoEnCurso = false;
    }
  }
}
