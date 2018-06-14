import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuariosService } from '../../servicios/usuarios.service';
@Component({
  selector: 'app-listado-remiseros',
  templateUrl: './listado-remiseros.component.html',
  styleUrls: ['./listado-remiseros.component.css']
})
export class ListadoRemiserosComponent implements OnInit {
  @Output() cambio: EventEmitter<any>= new EventEmitter<any>();  
  @Input()
  
  public listaUsuarios: Array<Usuario> = [];
  public miUsuariosService: UsuariosService;
  constructor(UsuariosService: UsuariosService) {
    this.miUsuariosService = UsuariosService
  }

  Habilitar(legajo: string) { 
    this.miUsuariosService.Habilitar(legajo).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
  }
  Desabilitar(legajo: string) {
    this.miUsuariosService.Desabilitar(legajo).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
   }

  ngOnInit() {
  }

}
