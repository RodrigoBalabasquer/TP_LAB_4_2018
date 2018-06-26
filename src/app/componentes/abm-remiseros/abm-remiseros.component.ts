import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { VerificarService } from '../../servicios/verificar.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-abm-remiseros',
  templateUrl: './abm-remiseros.component.html',
  styleUrls: ['./abm-remiseros.component.css']
})
export class AbmRemiserosComponent implements OnInit {


  public listadoParaCompartir: Array<any>;
  public miUsuario: Usuario;
  public isvalid: boolean = false;
  miServicioUsuario: UsuariosService;
  miServicioVerificacion: VerificarService
  claveCopia: string;

  
constructor(private router: Router, private builder: FormBuilder, ServicioUsuario: UsuariosService, VerificarService: VerificarService) {
    this.miUsuario = new Usuario(null, null, null, null, null, null, null, null, null, null);
    this.miServicioUsuario = ServicioUsuario;
    this.miServicioVerificacion = VerificarService;
    this.llamaServicePromesa();
  }

  ngOnInit() {
  }
  public llamaServicePromesa() {
    this.miServicioUsuario.listarPersonaPromesa().then(
      (listadoPromesa) => {
      this.listadoParaCompartir = listadoPromesa;
      }
    );
  }
  Actualizar(event: any)
  {
    this.llamaServicePromesa();
  }
  
}
