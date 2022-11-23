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

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    CartaComponent,
    LoginComponent,
    JuegoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuardService, TitleCasePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
