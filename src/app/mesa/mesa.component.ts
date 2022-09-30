import { Component, OnInit } from '@angular/core';
import { Carta } from '../interfaces/carta';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css'],
})
export class MesaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  capitalize(text: string) {
    return `${text.charAt(0).toUpperCase()}${text.substring(1)}`;
  }
}
