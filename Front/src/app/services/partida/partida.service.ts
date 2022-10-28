import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Carta } from 'src/app/interfaces/Carta';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  URL_API: string = `${environment.URL_BASE_API}/partida`;
  constructor(private http: HttpClient) {}

  getCarta(): Observable<Carta> {
    return this.http.get(`${this.URL_API}/getCarta`) as Observable<Carta>;
  }

  comenzarPartida(): Observable<boolean> {
    return this.http.get(`${this.URL_API}/comenzar`) as Observable<boolean>;
  }

  reiniciarJuego() {}
}
