import { TitleCasePipe } from '@angular/common';
import { FormatResultadoPipe } from './format-resultado.pipe';

describe('FormatResultadoPipe', () => {
  it('create an instance', () => {
    const titleCase = new TitleCasePipe();
    const pipe = new FormatResultadoPipe(titleCase);
    expect(pipe).toBeTruthy();
  });
});
