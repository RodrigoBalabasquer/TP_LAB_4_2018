import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UsuariosService } from '../../servicios/usuarios.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miServicioUsuario:UsuariosService;
  miServicioVerificacion: VerificarService;
  usuario = '';
  clave= '';
  logeando=true;
  mensaje = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ServicioUsuario: UsuariosService,
    ServicioVerificacion: VerificarService) {
      this.miServicioUsuario = ServicioUsuario;
      this.miServicioVerificacion = ServicioVerificacion;
      localStorage.clear();

  }

  Entrar() {
    
    //if (this.usuario === 'admin' && this.clave === 'admin') {
    //  this.router.navigate(['/Principal']);
    //}
    this.miServicioUsuario.BuscarUsuario(this.usuario,this.clave)
    .then((datos)=> {
      if(datos != null){
      //localStorage.setItem("token",JSON.stringify(datos));
      //this.router.navigate(['/Principal']);
      this.crearToken(datos);
      }
      else{
        this.mensaje = "Problema al iniciar sesión, el usuario o la contraseña son incorrectos";
      }
    })
    .catch( 
      (noSeEncontroUsuario) => {alert("Datos incorrectos");}
    );
  }

  crearToken(datos: any)
  {
    this.miServicioVerificacion.crearToken(datos).then((datos) => {
      if(datos == true)
        this.router.navigate(['/Principal']);
    })
  }
  Cargar()
  {
    this.usuario = "rodrix";
    this.clave = "Rodrigo1234";
  }
  ngOnInit() {
  }

}
