import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Vehiculo } from '../clases/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(public miHttp: HttpService) { }
  public listarVehiculosPromesa(): Promise<Array<Vehiculo>> {
    let promesa: Promise<Array<Vehiculo>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesas('vehiculo')
        .then(datos => {
          console.log(datos);
          let miArray: Array<Vehiculo> = new Array<Vehiculo>();
          for (let unDato of datos) {
            debugger;
            miArray.push(new Vehiculo(unDato.id, unDato.marca, unDato.modelo, unDato.patente,unDato.foto,unDato.estado));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  RegistrarVehiculo(vehiculo: Vehiculo,file: any): Promise<boolean> {
    let result: Promise<boolean> = this.miHttp.entregarVehiculo(vehiculo,file,'vehiculo')
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
