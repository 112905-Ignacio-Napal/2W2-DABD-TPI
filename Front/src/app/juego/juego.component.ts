import { PartidaService } from './../services/partida/partida.service';
import { Partida, ResultadoEnum } from './../interfaces/Partida';
import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/Jugador';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { cerrarSesion, getJugadorFromLocalStorage } from '../utils/utils';
import { Carta } from '../interfaces/Carta';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { FormatResultadoPipe } from '../pipes/format-resultado.pipe';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  croupier: Jugador = {} as Jugador;
  jugador: Jugador = {} as Jugador;
  partida: Partida = {} as Partida;
  cantidadPartidas = 0;
  sub: Subscription = new Subscription();

  constructor(
    private partidaService: PartidaService,
    private router: Router,
    private formatResultado: FormatResultadoPipe
  ) {
    this.jugador = getJugadorFromLocalStorage();
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.partidaService.getPartidaEnCurso(this.jugador.id).subscribe({
      next: (partida) => {
        this.partida = partida;
        this.sumarCartasPartida();
      },
      error: () => {
        this.iniciarPartida();
      },
    });
  }

  iniciarPartida() {
    if (this.cantidadPartidas !== 0) {
      Swal.fire({
        title: '¿Comenzar nueva partida?',
        icon: 'question',
        iconColor: 'blue',
        html: `<p>¿Desea comenzar una nueva partida?</p>
        <p>Perderá el progreso de la partida en curso</p>`,
        confirmButtonColor: 'green',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        cancelButtonColor: 'red',
      }).then((r) => {
        if (r.isConfirmed) {
          this.partida = {} as Partida;
          this.cantidadPartidas++;
          this.comenzarPartida();
        }
      });
    } else {
      this.cantidadPartidas++;
      this.partida = {} as Partida;
      this.comenzarPartida();
    }
  }

  pedirCarta(isJugador: boolean) {
    this.sub.add(
      this.partidaService.getCarta(this.partida.id, isJugador).subscribe({
        next: (carta) => {
          this.partida.cartas.push(carta);
          if (isJugador) {
            this.jugador.cartas.push(carta);
            this.partida.puntosJugador = this.sumarCartas(this.jugador.cartas);
            if (this.partida.puntosJugador >= 21) {
              this.terminarJugada();
            }
          } else {
            this.croupier.cartas.push(carta);
            this.partida.puntosCroupier = this.sumarCartas(
              this.croupier.cartas
            );
          }
        },
        error: (e: HttpErrorResponse) =>
          Swal.fire({
            title: 'Error al obtener una carta',
            text: e.error,
            icon: 'error',
          }),
      })
    );
  }
  sumarCartas(cartas: Carta[]): number {
    let puntaje = cartas.reduce((acc, carta) => (acc += carta.valor), 0);
    cartas.forEach((c) => {
      if (c.simbolo.toUpperCase() === 'A' && puntaje + 10 <= 21) {
        puntaje += 10;
      }
    });
    return puntaje;
  }

  comenzarPartida() {
    this.sub.add(
      this.partidaService.comenzarPartida(this.jugador.id).subscribe({
        next: (partida) => {
          this.partida = partida;
          this.partida.cartas = [] as Carta[];
          this.jugador.cartas = [] as Carta[];
          this.croupier.cartas = [] as Carta[];
          this.pedirCarta(true);
          this.pedirCarta(true);
          this.pedirCarta(false);
        },
        error: (e: HttpErrorResponse) =>
          Swal.fire({
            title: 'Error al comenzar partida',
            text: e.error,
            icon: 'error',
          }),
      })
    );
  }

  salir() {
    Swal.fire({
      title: 'Salir del juego',
      icon: 'question',
      iconColor: 'blue',
      html: `<p>¿Desea salir del juego?</p>
        <p>La partida en curso será guardada</p>`,
      confirmButtonColor: 'green',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      cancelButtonColor: 'red',
    }).then((r) => {
      if (r.isConfirmed) {
        cerrarSesion();
        this.router.navigate(['./login']);
      }
    });
  }

  plantarse() {
    Swal.fire({
      title: '¿Plantarse?',
      icon: 'question',
      iconColor: 'blue',
      html: `<p>¿Desea plantarse?</p>`,
      confirmButtonColor: 'green',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      cancelButtonColor: 'red',
    }).then((r) => {
      if (r.isConfirmed) {
        this.terminarJugada();
      }
    });
  }

  verReportes() {
    this.router.navigate(['./reportes']);
  }

  terminarJugada() {
    this.sub.add(
      this.partidaService.plantarse(this.partida.id).subscribe({
        next: (partida) => {
          this.partida = partida;
          this.sumarCartasPartida();
        },
      })
    );
  }

  sumarCartasPartida() {
    this.jugador.cartas = this.partida.cartas.filter((c) => c.cartaJugador);
    this.croupier.cartas = this.partida.cartas.filter((c) => !c.cartaJugador);
    this.partida.puntosJugador = this.sumarCartas(this.jugador.cartas);
    this.partida.puntosCroupier = this.sumarCartas(this.croupier.cartas);
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
