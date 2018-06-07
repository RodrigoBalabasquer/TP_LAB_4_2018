import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 URl = "http://localhost:8080/apirestTPFinal/apirestV6-JWT-MW-POO/remiseria/";

  constructor(public http: HttpClient) { }

  extraerDatos(respuesta) {
    return respuesta || { };
  }
  manejadorError(error: Response | any) {
    //return error;
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  buscarUsuario(url:string,usuario:string,clave:string)
  { 
    const formData = new FormData()
    formData.append('usuario',usuario);
    formData.append('contrasenia',clave);
    //var param = {usuario:usuario,contrasenia:clave};
    //var paramString = JSON.stringify(param);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  crearToken(url:string,datos:any)
  { 
    debugger;
    const formData = new FormData()
    formData.append('usuario',datos.usuario);
    formData.append('nomre',datos.nombre);
    formData.append('apellido',datos.apellido);
    formData.append('tipo',datos.tipo);
    formData.append('fechaNacimiento',datos.fechaNacimiento);
    formData.append('legajo',datos.legajo)
    //var param = {usuario:datos.nombre,clave:datos.contrasenia};
    //var paramString = JSON.stringify(param);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  verificarToken(token:any,url:string)
  { 
    const formData = new FormData()
    formData.append('Token',token);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
}
