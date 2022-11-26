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
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  reporteUnoData = [
    { name: 'Jugadas', value: 0 },
    { name: 'Victorias', value: 0 },
  ];
  reporteDosData = [
    { name: 'Partidas Jugadas', value: 0 },
    { name: 'Jugadores', value: 0 },
  ];
  maxFecha = new Date();
  formReporte: FormGroup;

  constructor(
    private reportesService: ReportesService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.jugador = getJugadorFromLocalStorage();
    this.formReporte = fb.group({
      diaCantidad: datePipe.transform(this.maxFecha, 'yyyy-MM-dd'),
    });

    this.diaCantidad?.valueChanges.subscribe((v) => {
      const date = new Date(v);
      this.getCantidadPorDia(
        datePipe.transform(date.toUTCString(), 'yyyy/MM/dd', '-0000')
      );
    });

    this.getVictoriasCroupier();
    this.getCantidadPorDia(
      datePipe.transform(this.maxFecha, 'yyyy/MM/dd', 'es-AR')
    );
    this.getPromedioBlackjack();
  }

  public get diaCantidad() {
    return this.formReporte.get('diaCantidad');
  }

  ngOnInit(): void {}

  getVictoriasCroupier() {
    this.sub.add(
      this.reportesService.getVictoriasCroupier(this.jugador.id).subscribe({
        next: (reporte) => {
          this.reporteUno = reporte;
          const derrotas = reporte.partidasJugadas - reporte.victorias;
          this.reporteUnoData = [
            { name: 'Victorias', value: reporte.victorias },
            { name: 'Derrotas', value: derrotas },
          ];
        },
      })
    );
  }
  getCantidadPorDia(dia: any) {
    this.sub.add(
      this.reportesService.getCantidadPorDia(dia).subscribe({
        next: (reporte) => {
          this.reporteDos = reporte;
          this.reporteDosData = [
            { name: 'Partidas Jugadas', value: reporte.cantidadJuegos },
            { name: 'Jugadores', value: reporte.cantidadJugadores },
          ];
        },
      })
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
