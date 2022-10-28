import { Component, Input, OnInit } from '@angular/core';
import { Carta } from '../interfaces/Carta';
@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
})
export class CartaComponent implements OnInit {
  @Input() carta: Carta = {} as Carta;
  constructor() {}

  numSequence(n: number): Array<number> {
    return Array(n);
  }
  ngOnInit(): void {}
}
