import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  verificarService : VerificarService;
  TIPO : number;
  usuario: string;
  constructor(VerificarService:VerificarService) {
    this.verificarService = VerificarService;
   }

  ngOnInit() {
    debugger;
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        debugger;
        this.TIPO = datos.respuesta.tipo;
        this.usuario = datos.respuesta.usuario;
      }
    );
  }

}
