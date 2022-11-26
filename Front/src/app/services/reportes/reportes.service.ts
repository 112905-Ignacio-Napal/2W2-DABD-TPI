import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export type VictoriasCroupier = {
  partidasJugadas: number;
  victorias: number;
};
export type CantidadPorDia = {
  cantidadJuegos: number;
  cantidadJugadores: number;
};
export type PromedioBlackjack = {
  nombreJugador: string;
  cantidadPartidas: number;
  cantidadBlackjacksJugador: number;
  promedioBlackjacksJugador: number;
  cantidadBlackJacksCroupier: number;
  promedioBlackjacksCroupier: number;
};

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  URL_API: string = `${environment.URL_BASE_API}/partida`;
  constructor(private http: HttpClient) {}

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
  getPromedioBlackjack(): Observable<PromedioBlackjack[]> {
    return this.http.get(
      `${this.URL_API}/getPromedioBlackjack`
    ) as unknown as Observable<PromedioBlackjack[]>;
  }
}
