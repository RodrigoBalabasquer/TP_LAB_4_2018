import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Viaje } from '../clases/viaje';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(public miHttp: HttpService) { }
  RegistrarViaje(vehiculo: Viaje): Promise<number> {
    let result: Promise<number> = this.miHttp.entregarViaje('CargarViaje', vehiculo)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  ActualizarViaje(vehiculo: Viaje): Promise<any> {
    let result: Promise<any> = this.miHttp.actualizarViaje('ActualizarViaje', vehiculo)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  ActualizarViaje2(vehiculo: Viaje): Promise<any> {
    debugger;
    let result: Promise<any> = this.miHttp.actualizarViaje2('ActualizarViaje2', vehiculo)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  listarViajesRemiseroPromesa(legajo): Promise<Array<Viaje>> {
    let promesa: Promise<Array<Viaje>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesasRemiseroViajes('TraerViajesRemisero', legajo)
        .then(datos => {
          console.log(datos);
          let miArray: Array<Viaje> = new Array<Viaje>();
          for (let unDato of datos) {
            let viaje = new Viaje(unDato.id, unDato.legajoRemisero, unDato.idVehiculo,
              unDato.legajoCliente, unDato.latDesde, unDato.latHasta, unDato.lngDesde, unDato.lngHasta,
              unDato.duracion, unDato.distancia, unDato.precio, unDato.cantidadPasajeros, unDato.comodidad, unDato.medioDePago, unDato.estado, unDato.horario);
            miArray.push(viaje);
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  listarViajesPromesa(): Promise<Array<Viaje>> {
    let promesa: Promise<Array<Viaje>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesasViajes('TraerViajes')
        .then(datos => {
          console.log(datos);
          let miArray: Array<Viaje> = new Array<Viaje>();
          for (let unDato of datos) {
            let viaje = new Viaje(unDato.id, unDato.legajoRemisero, unDato.idVehiculo,
              unDato.legajoCliente, unDato.latDesde, unDato.latHasta, unDato.lngDesde, unDato.lngHasta,
              unDato.duracion, unDato.distancia, unDato.precio, unDato.cantidadPasajeros, unDato.comodidad, unDato.medioDePago, unDato.estado, unDato.horario);
            miArray.push(viaje);
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
}
