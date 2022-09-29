import { Component, OnInit } from '@angular/core';
import { Carta, cartas } from '../interfaces/carta';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css'],
})
export class MesaComponent implements OnInit {
  mazo: Carta[] = cartas;
  constructor() {}

  ngOnInit(): void {
    console.log(cartas.map((c) => c.url));
  }

  capitalize(text: string) {
    return `${text.charAt(0).toUpperCase()}${text.substring(1)}`;
  }
}
