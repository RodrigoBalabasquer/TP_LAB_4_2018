import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PrincipalComponent } from './componentes/principal/principal.component';

import { RouterModule, Routes } from '@angular/router';
import { RuteoModule } from './ruteo/ruteo.module';

import {HttpService} from './servicios/http.service';
import {UsuariosService} from './servicios/usuarios.service';
import {VerificarService} from './servicios/verificar.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MenuComponent,
    PrincipalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RuteoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UsuariosService,HttpService,VerificarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
