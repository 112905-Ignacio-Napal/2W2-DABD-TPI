import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/Jugador';
import { getJugadorFromLocalStorage } from '../utils/utils';
import {
  VictoriasCroupier,
  CantidadPorDia,
  PromedioBlackjack,
  ReportesService,
} from '../services/reportes/reportes.service';

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
  reporteTres: PromedioBlackjack[] = {} as PromedioBlackjack[];
  constructor(
    private reportesService: ReportesService,
    private router: Router
  ) {
    this.jugador = getJugadorFromLocalStorage();
    this.getVictoriasCroupier();
    this.getCantidadPorDia();
    this.getPromedioBlackjack();
  }

  ngOnInit(): void {}

  getVictoriasCroupier() {
    this.sub.add(
      this.reportesService
        .getVictoriasCroupier(this.jugador.id)
        .subscribe({ next: (reporte) => (this.reporteUno = reporte) })
    );
  }
  getCantidadPorDia() {
    this.sub.add(
      this.reportesService
        .getCantidadPorDia('11/24/2022')
        .subscribe({ next: (reporte) => (this.reporteDos = reporte) })
    );
  }
  getPromedioBlackjack() {
    this.sub.add(
      this.reportesService
        .getPromedioBlackjack()
        .subscribe({ next: (reporte) => (this.reporteTres = reporte) })
    );
  }

  volver() {
    this.router.navigate(['./juego']);
  }
}
