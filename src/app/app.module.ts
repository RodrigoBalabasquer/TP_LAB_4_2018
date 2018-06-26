import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ViajeComponent } from './componentes/viaje/viaje.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AbmRemiserosComponent } from './componentes/abm-remiseros/abm-remiseros.component';
import { ListadoRemiserosComponent } from './componentes/listado-remiseros/listado-remiseros.component';
import { AbmVehiculosComponent } from './componentes/abm-vehiculos/abm-vehiculos.component';
import { ListadoVehiculosComponent } from './componentes/listado-vehiculos/listado-vehiculos.component';
import { ExponentialStrengthPipe} from './exponential-strength.pipe';

import { RouterModule, Routes } from '@angular/router';
import { RuteoModule } from './ruteo/ruteo.module';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings} from 'ng-recaptcha';

import {HttpService} from './servicios/http.service';
import {UsuariosService} from './servicios/usuarios.service';
import {VehiculosService} from './servicios/vehiculos.service';
import {ViajesService} from './servicios/viajes.service';
import {VerificarService} from './servicios/verificar.service';


import { FileDropModule } from 'ngx-file-drop';
import { AgmCoreModule } from '@agm/core';           
import { AgmDirectionModule } from 'agm-direction';
import { HorariosComponent } from './componentes/horarios/horarios.component';
import { ListaViajesComponent } from './componentes/lista-viajes/lista-viajes.component';
import { GestorViajesComponent } from './componentes/gestor-viajes/gestor-viajes.component';
import { PreloadImagenComponent } from './componentes/preload-imagen/preload-imagen.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MenuComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    AbmRemiserosComponent,
    ListadoRemiserosComponent,
    AbmVehiculosComponent,
    ListadoVehiculosComponent,
    ViajeComponent,
    HorariosComponent,
    ListaViajesComponent,
    GestorViajesComponent,
    PreloadImagenComponent,
    ExponentialStrengthPipe,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    RuteoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileDropModule,
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyA3KKoeuXANsYY9u67GSzA6IxJEJG7OFjg',
    }),
    AgmDirectionModule,
    RecaptchaModule.forRoot()
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: '6LfpD18UAAAAAF5G961BFO14n0GnyW1GkubRzcU9'} as RecaptchaSettings, 
    },
    UsuariosService,
    VehiculosService,
    ViajesService,HttpService,
    VerificarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
