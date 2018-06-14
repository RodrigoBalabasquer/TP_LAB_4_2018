import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Usuario } from '../clases/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public miHttp: HttpService) { }
  public listarPersonaPromesa(): Promise<Array<Usuario>> {
    let promesa: Promise<Array<Usuario>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesas('')
        .then(datos => {
          console.log(datos);
          let miArray: Array<Usuario> = new Array<Usuario>();
          for (let unDato of datos) {
            debugger;
            miArray.push(new Usuario(unDato.Legajo, unDato.Usuario, unDato.Nombre, unDato.Apellido,unDato.contrasenia,unDato.tipo,unDato.foto,unDato.fechadeNacimiento,unDato.habilitado,unDato.sexo));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  BuscarUsuario(usuario: string, clave: string): Promise<Usuario> {
    let promesa: Promise<Usuario> = new Promise((resolve, reject) => {
      this.miHttp.buscarUsuario("traer", usuario, clave)
        .then(datos => {
          if (datos.length > 0) {
            let usuario = new Usuario(datos[0].Legajo, datos[0].Usuario, datos[0].Nombre, datos[0].Apellido, datos[0].contrasenia, datos[0].tipo, datos[0].foto, datos[0].fechadeNacimiento, datos[0].habilitado, datos[0].sexo)
            resolve(usuario);
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
  RegistrarCliente(usuario: Usuario): Promise<boolean> {
    usuario.tipo = 2;
    let result: Promise<boolean> = this.miHttp.entregarUsuario(usuario)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  RegistrarRemisero(usuario: Usuario): Promise<boolean> {
    usuario.tipo = 3;
    let result: Promise<boolean> = this.miHttp.entregarUsuario(usuario)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  Habilitar(Legajo:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.habilitarEmpleado('habilitar',Legajo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  Desabilitar(Legajo:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.desabilitarEmpleado('desabilitar',Legajo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
}
