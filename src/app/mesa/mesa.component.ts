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
    this.pedirCartaJugador();
  }

  pedirCartaJugador() {
    const cartaObtenida = this.cartaService.getCarta();
    this.jugador.cartas.push(cartaObtenida);
  }
  sumarCartas(): number {
    let resultado = 0;

    this.jugador.cartas.forEach((carta) => (resultado += carta.valor));

    return resultado;
  }
}
