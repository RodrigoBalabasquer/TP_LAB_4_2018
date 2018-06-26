import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../servicios/horario.service';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { Horario} from '../../clases/horario';
import { Remisero} from '../../clases/remisero';
import { Vehiculo} from '../../clases/vehiculo';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  legajo: string ;
  formulario: boolean = false;
  formularioVehiculo: boolean = false;
  listaVehiculo : Array<Vehiculo> = [];

  horario: Horario;
  idHorario: number = 0;
  idVehiculo: number = 0;
  patenteVehiculo: string = "";
  idRemisero: number = 0;
  constructor(public miServicioHorario: HorarioService,public miServicioVehiculo: VehiculosService) {
    this.horario = new Horario(null,null,null,null,null,null);
    this.horario.remisero = new Remisero(null,null,null,null,null,null,null,null,null,null,null);
    this.horario.vehiculo = new Vehiculo(null,null,null,null,null,null,null);
   }
  buscar()
  {
    this.miServicioHorario.BuscarRemisero(this.legajo).then(
      (datos) => {
        if(datos == null){
          alert("No se encontro remisero");
          this.formulario = false;
        }
        else{
          if(datos[0].estado == 3 || datos[0].estado == 1){
            alert("El remisero no esta trabajando actualmente");
            this.formulario = false;
          }
          else{
            this.formulario = true;
            this.idRemisero = datos[0].legajo;
            this.idVehiculo = datos[0].vehiculo.id;
            if(this.idVehiculo == null)
              this.formularioVehiculo = true;
            this.miServicioHorario.BuscarHorario(this.legajo).then(
              (datos) => {
                if(datos != null)
                { 
                  this.idHorario = datos[0].id;
                  this.horario.timeDesde = datos[0].timeDesde;
                  this.horario.timeHasta = datos[0].timeHasta;
                  debugger;
                  this.idVehiculo = datos[0].vehiculo;
                }
                else
                {
                  this.idHorario = null;
                }
                if(this.formularioVehiculo)
                  this.traerVehiculosDiponibles();
              }
            )
          }
        }
      })
    .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }
  traerVehiculosDiponibles()
  {
    this.miServicioVehiculo.listarVehiculosReiseriaPromesa().then(
    (datos) =>{
        this.listaVehiculo = datos;
      });
    
  }
  guardarHorario()
  { 
    this.miServicioHorario.VerificarHorario(this.idRemisero,this.idVehiculo,this.horario.timeDesde,this.horario.timeHasta).then(
      (datos)=>{
        if(datos == 0){
          debugger;
          this.horario.remisero.legajo = this.idRemisero;
          this.horario.vehiculo.id = this.idVehiculo;
          this.horario.id = this.idHorario;
          this.miServicioHorario.guardarHorario(this.horario).then((datos)=>{
            alert("horario actualizado");
          })
        }
        else{
          alert("horario invalido");
        }
      }
    );
    
  }
  elegir(id:number,patente: string)
  { 
    this.idVehiculo = id;
    this.patenteVehiculo = patente;
  }
  ngOnInit() {
  }

}
