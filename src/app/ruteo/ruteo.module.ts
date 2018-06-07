import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {PrincipalComponent} from '../componentes/principal/principal.component';
import {ErrorComponent} from '../componentes/error/error.component';
import {LoginComponent} from '../componentes/login/login.component';

import {VerificarService} from '../servicios/verificar.service';

const MiRuteo = [
{path: '' , component: PrincipalComponent,canActivate: [VerificarService],},
{path: 'Login' , component: LoginComponent},
{path: 'Principal' , component: PrincipalComponent,canActivate: [VerificarService],},
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
