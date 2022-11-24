import { Subscription } from 'rxjs';
import { PartidaService } from './../services/partida/partida.service';
import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/Jugador';
import { getJugadorFromLocalStorage } from '../utils/utils';

export type VictoriasCroupier = {
  partidas: number;
  victorias: number;
};
export type CantidadPorDia = {
  cantidadPartidas: number;
  cantidadJugadores: number;
};

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  sub: Subscription = new Subscription();
  jugador: Jugador;
  reporteUno: VictoriasCroupier = {} as VictoriasCroupier;
  reporteDos: CantidadPorDia = {} as CantidadPorDia;
  constructor(private partidaService: PartidaService) {
    this.jugador = getJugadorFromLocalStorage();
    this.getVictoriasCroupier();
    this.getCantidadPorDia();
  }

  ngOnInit(): void {}

  getVictoriasCroupier() {
    this.sub.add(
      this.partidaService
        .getVictoriasCroupier(this.jugador.id)
        .subscribe({ next: (reporte) => (this.reporteUno = reporte) })
    );
  }
  getCantidadPorDia() {
    this.sub.add(
      this.partidaService
        .getCantidadPorDia('11/24/2022') //Harcodeo momentaneo
        .subscribe({ next: (reporte) => (this.reporteDos = reporte) })
    );
  }
}
