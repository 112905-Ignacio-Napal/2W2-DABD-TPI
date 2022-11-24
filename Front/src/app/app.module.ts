import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartaComponent } from './carta/carta.component';
import { LoginComponent } from './login/login.component';
import { JuegoComponent } from './juego/juego.component';
import { AuthGuardService } from './auth-guard.service';
import { TitleCasePipe } from '@angular/common';
import { FormatResultadoPipe } from './pipes/format-resultado.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    CartaComponent,
    LoginComponent,
    JuegoComponent,
    FormatResultadoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuardService, TitleCasePipe, FormatResultadoPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
