import { Jugador } from './../interfaces/Jugador';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { setJugadorOnLocalStorage } from '../utils/utils';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: UntypedFormGroup;
  sub: Subscription = new Subscription();

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = fb.group({
      username: ['', [Validators.minLength(4), Validators.required]],
      password: ['', [Validators.minLength(4), Validators.required]],
    });
  }

  public get username() {
    return this.formLogin.get('username');
  }
  public get password() {
    return this.formLogin.get('password');
  }

  ngOnInit(): void {}

  iniciar() {
    if (this.formLogin.valid) {
      const jugador = this.formLogin.value as Jugador;
      jugador.partidas = [];
      this.sub.add(
        this.userService.iniciar(jugador).subscribe({
          next: (jugador) => {
            setJugadorOnLocalStorage(jugador as Jugador);
            this.router.navigate(['./juego']);
          },
          error: (e: HttpErrorResponse) =>
            Swal.fire({
              title: 'Error al ingresar',
              text: e.error,
              icon: 'error',
            }),
        })
      );
    }
  }

  registrar() {
    if (this.formLogin.valid) {
      const jugador = this.formLogin.value as Jugador;
      jugador.partidas = [];
      this.sub.add(
        this.userService.registrar(jugador).subscribe({
          next: (r) =>
            Swal.fire({
              title: 'Usuario registrado',
              text: 'Usuario registrado exitosamente',
              icon: 'success',
              confirmButtonColor: 'green',
            }),
          error: (e: HttpErrorResponse) =>
            Swal.fire({
              title: 'Error al registrar',
              text: e.error,
              icon: 'error',
            }),
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
