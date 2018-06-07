import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Usuario } from '../clases/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public miHttp: HttpService) { }
  BuscarUsuario(usuario:string,clave:string):Promise<Usuario>
  {
    let promesa: Promise<Usuario> = new Promise((resolve, reject) =>
    {
      this.miHttp.buscarUsuario("traer",usuario,clave)
      .then(datos=> {
        debugger;
        if(datos.length  > 0 ){
        let usuario = new Usuario(datos[0].Legajo,datos[0].Usuario,datos[0].Nombre,datos[0].Apellido,datos[0].contrasenia,datos[0].tipo,datos[0].foto,datos[0].fechadeNacimiento)
        resolve(usuario);}
        else
        {
          resolve(null);
        }
      })
      .catch(error => {console.log(error)});
    });
    return promesa;
  }
}
