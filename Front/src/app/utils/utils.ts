import { Jugador } from 'src/app/interfaces/Jugador';

export function getJugadorFromLocalStorage() {
  const jugador = localStorage.getItem('jugador');
  return jugador ? JSON.parse(jugador) : jugador;
}
export function setJugadorOnLocalStorage(jugador: Jugador) {
  localStorage.setItem('jugador', JSON.stringify(jugador));
}
export function cerrarSesion() {
  localStorage.removeItem('jugador');
}

export function isLoggeado() {
  return getJugadorFromLocalStorage() ? true : false;
}
