import { CanActivate } from '@angular/router/public_api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {PrincipalComponent} from '../componentes/principal/principal.component';
import {RegistroComponent} from '../componentes/registro/registro.component';
import {ErrorComponent} from '../componentes/error/error.component';
import {LoginComponent} from '../componentes/login/login.component';
import {AbmRemiserosComponent} from '../componentes/abm-remiseros/abm-remiseros.component';
import {AbmVehiculosComponent} from '../componentes/abm-vehiculos/abm-vehiculos.component';
import {ViajeComponent} from '../componentes/viaje/viaje.component';

import {VerificarService} from '../servicios/verificar.service';

const MiRuteo = [
{path: '' , component: LoginComponent},
// {path: 'Login' , component: LoginComponent},
// {path: 'Principal' , component: PrincipalComponent,canActivate: [VerificarService],},
// {path: 'Remiseros' , component: AbmRemiserosComponent,canActivate: [VerificarService],},
// {path: 'Vehiculos' , component: AbmVehiculosComponent,canActivate: [VerificarService],},
// {path: 'Viaje' , component: ViajeComponent,canActivate: [VerificarService],},
// {path: 'Registro' , component: RegistroComponent},
{path: 'Login' , component: LoginComponent},
{path: 'Principal' , component: PrincipalComponent,canActivate: [VerificarService],},
{path: 'Remiseros' , component: AbmRemiserosComponent,canActivate: [VerificarService],},
{path: 'Vehiculos' , component: AbmVehiculosComponent,canActivate: [VerificarService],},
{path: 'Viaje' , component: ViajeComponent,canActivate: [VerificarService],},
{path: 'Registro' , component: RegistroComponent},
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}]


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteoModule { }
