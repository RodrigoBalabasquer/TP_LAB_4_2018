import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 URl = "http://localhost:8080/apirestTPFinal/apirestV6-JWT-MW-POO/remiseria/";
 //URl = "http://rodrigobalabasquer.esy.es/apirestTPFinal/apirestV6-JWT-MW-POO/remiseria/";
  constructor(public http: HttpClient) { }
  public httpGetP ( direccion: string)
  { 
    return this.http
    .get( "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA3KKoeuXANsYY9u67GSzA6IxJEJG7OFjg&address="+direccion)
    .toPromise()
    .then( this.extractData )
    .catch( this.manejadorError );
  }
  private extractData ( res: any )
  { 
    return res.results[0].geometry.location;
  }
  extraerDatos(respuesta) {
    return respuesta || { };
  }

  manejadorError(error: Response | any) {
    //return error;
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  dameTodasLasPromesas(url:string){
    
    return this.http.get(this.URl+url).toPromise().then(this.extraerDatos).catch(this.manejadorError);

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
  entregarUsuario(user:any)
  {
    //var param = {usuario:player.usuario,nombre:player.nombre,apellido:player.apellido,contrasenia:player.contrasenia,email:player.email};
    //var paramString = JSON.stringify(param);
    const formData = new FormData()
    formData.append('usuario',user.usuario);
    formData.append('apellido',user.apellido);
    formData.append('nombre',user.nombre);
    formData.append('sexo',user.sexo);
    formData.append('contrasenia',user.contrasenia);
    formData.append('tipo',user.tipo);
    formData.append('foto',user.foto);
    formData.append('fechaDeNacimiento',user.fechaNacimiento);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  entregarVehiculo(vehiculo:any,file:any,url:string)
  { 
    const formData = new FormData()
    formData.append('marca',vehiculo.marca);
    formData.append('patente',vehiculo.patente);
    formData.append('modelo',vehiculo.modelo);
    formData.append('foto',file);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  crearToken(url:string,datos:any)
  { 
    const formData = new FormData()
    formData.append('usuario',datos.usuario);
    formData.append('nombre',datos.nombre);
    formData.append('apellido',datos.apellido);
    formData.append('tipo',datos.tipo);
    formData.append('fechaNacimiento',datos.fechaNacimiento);
    formData.append('legajo',datos.legajo)
    formData.append('habilitado',datos.habilitado);
    formData.append('foto',datos.foto);
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
  recuperarToken(token:any)
  {
    const formData = new FormData()
    formData.append('Token',token);
    
    var url = "RecuperarToken";
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  habilitarEmpleado(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('Legajo',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  desabilitarEmpleado(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('Legajo',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
}
