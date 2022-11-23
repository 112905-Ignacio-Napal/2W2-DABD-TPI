import { Jugador } from 'src/app/interfaces/Jugador';

export function getJugadorFromLocalStorage() {
  const jugador = localStorage.getItem('jugador');
  return jugador ? JSON.parse(jugador) : jugador;
}
export function setJugadorOnLocalStorage(jugador: Jugador) {
  return localStorage.setItem('jugador', JSON.stringify(jugador));
}
export function cerrarSesion() {
  return localStorage.removeItem('jugador');
}

export function isLoggeado() {
  return getJugadorFromLocalStorage()? true :false;
}
