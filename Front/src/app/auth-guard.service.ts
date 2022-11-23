import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { isLoggeado } from './utils/utils';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!isLoggeado()) {
      if (state.url === '/login') {
        return true;
      }
      this.router.navigate(['./login']);
      return false;
    } else {
      if (state.url === '/login') {
        this.router.navigate(['./juego']);
        return false;
      } else {
        const ruta = state.url;
        return ruta === '/juego' ? true : false;
      }
    }
  }
}
