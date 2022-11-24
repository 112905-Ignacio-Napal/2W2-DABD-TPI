import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatResultado',
})
export class FormatResultadoPipe implements PipeTransform {
  constructor(private titleCase: TitleCasePipe) {}

  transform(resultado: string): string {
    return this.titleCase.transform(resultado.split('_').join(' '));
  }
}
