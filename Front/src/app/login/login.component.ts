import { Jugador } from './../interfaces/Jugador';
import { UserService } from './../services/user/user.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService
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
      this.userService
        .iniciar(jugador)
        .subscribe({ next: (e) => console.log(e) });
    }
  }

  registrar() {
    if (this.formLogin.valid) {
      const jugador = this.formLogin.value as Jugador;
      jugador.partidas = [];
      this.userService
        .registrar(jugador)
        .subscribe({ next: (e) => console.log(e) });
    }
  }
}
