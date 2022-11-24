import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Carta } from 'src/app/interfaces/Carta';
import { Partida } from 'src/app/interfaces/Partida';
import {
  CantidadPorDia,
  VictoriasCroupier,
} from 'src/app/reportes/reportes.component';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  URL_API: string = `${environment.URL_BASE_API}/partida`;
  constructor(private http: HttpClient) {}

  getCarta(idPartida: number, tipoJugador: boolean): Observable<Carta> {
    return this.http.get(`${this.URL_API}/getCarta`, {
      params: { idPartida: idPartida, tipoJugador: tipoJugador },
    }) as Observable<Carta>;
  }

  comenzarPartida(idJugador: number): Observable<Partida> {
    return this.http.get(`${this.URL_API}/comenzar`, {
      params: { idJugador: idJugador },
    }) as Observable<Partida>;
  }

  plantarse(idPartida: number): Observable<Partida> {
    return this.http.get(`${this.URL_API}/plantarse`, {
      params: { idPartida: idPartida },
    }) as Observable<Partida>;
  }

  getPartidaEnCurso(idJugador: number): Observable<Partida> {
    return this.http.get(`${this.URL_API}/getPartidaEnCurso`, {
      params: { idJugador: idJugador },
    }) as Observable<Partida>;
  }

  getVictoriasCroupier(idJugador: number): Observable<VictoriasCroupier> {
    return this.http.get(`${this.URL_API}/getVictoriasCroupier`, {
      params: { idJugador: idJugador },
    }) as Observable<VictoriasCroupier>;
  }
  getCantidadPorDia(fecha: string): Observable<CantidadPorDia> {
    return this.http.get(`${this.URL_API}/getCantidadPorDia`, {
      params: { fecha: fecha },
    }) as unknown as Observable<CantidadPorDia>;
  }
}
