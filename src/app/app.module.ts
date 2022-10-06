import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesaComponent } from './mesa/mesa.component';
import { CartaComponent } from './carta/carta.component';

@NgModule({
  declarations: [AppComponent, MesaComponent, CartaComponent, CartaComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
