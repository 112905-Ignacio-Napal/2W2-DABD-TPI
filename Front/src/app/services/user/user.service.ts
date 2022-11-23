import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from 'src/app/interfaces/Jugador';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  AUTH_URL_BASE = `${environment.URL_BASE_API}`;
  constructor(private http: HttpClient) {}

  registrar(jugador: Jugador): Observable<Jugador> {
    return this.http.post(
      `${this.AUTH_URL_BASE}/signup`,
      jugador
    ) as Observable<Jugador>;
  }

  iniciar(jugador: Jugador): Observable<Object> {
    return this.http.post(
      `${this.AUTH_URL_BASE}/signin`,
      jugador
    ) as Observable<Jugador>;
  }

  logout(jugador: Jugador) {
    return this.http.post(
      `${this.AUTH_URL_BASE}/signin`,
      jugador
    ) as Observable<Jugador>;
  }
}
