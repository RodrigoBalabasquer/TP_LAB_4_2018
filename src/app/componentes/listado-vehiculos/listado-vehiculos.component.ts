import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Vehiculo } from '../../clases/vehiculo';

@Component({
  selector: 'app-listado-vehiculos',
  templateUrl: './listado-vehiculos.component.html',
  styleUrls: ['./listado-vehiculos.component.css']
})
export class ListadoVehiculosComponent implements OnInit {
  @Input()
  public listaVehiculo: Array<Vehiculo> = [];
  constructor() { }
  
  ngOnInit() {
  }

}
