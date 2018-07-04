import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ViajesService } from '../../servicios/viajes.service';
import { HorarioService } from '../../servicios/horario.service';
import { VerificarService } from '../../servicios/verificar.service';
import { HttpService } from '../../servicios/http.service';
import { Viaje } from '../../clases/viaje';
import { Horario } from '../../clases/horario';
import { Remisero } from '../../clases/remisero';
import { Vehiculo } from '../../clases/vehiculo';
@Component({
  selector: 'app-gestor-viajes',
  templateUrl: './gestor-viajes.component.html',
  styleUrls: ['./gestor-viajes.component.css']
})
export class GestorViajesComponent implements OnInit {

  TIPO: number;
  legajo: number;
  listaViajes: Array<Viaje> = [];
  listaHorarios: Array<any> = [];
  miViaje: Viaje;
  mostrar: boolean = false;
  dir = undefined;
  motivo: string = "";

  latD:number = 0;
  latH:number = 0;
  lngD:number = 0;
  lngH:number = 0;

  constructor(private router: Router, public http: HttpService, public ViajesServicio: ViajesService, public HorariosServicio: HorarioService, public verificarService: VerificarService) {
  }
  public llamaServicePromesa() {
    if (this.TIPO == 1) {
      this.ViajesServicio.listarViajesPromesa().then(
        (listadoPromesa) => {
          this.listaViajes = listadoPromesa;
        }
      );
    }
    if (this.TIPO == 3) {
      this.ViajesServicio.listarViajesRemiseroPromesa(this.legajo).then(
        (listadoPromesa) => {
          this.listaViajes = listadoPromesa;
        }
      );
    }
  }
  Ver(viaje: Viaje) {
    debugger;
    this.miViaje = new Viaje(viaje.id, null, null, viaje.legajoCliente, viaje.latDesde, viaje.latHasta, viaje.lngDesde, viaje.lngHasta, viaje.duracion, viaje.distancia, viaje.precio, viaje.cantidad
      , viaje.comodidad, viaje.medioDePago, viaje.estado, viaje.horario);
    this.miViaje.horario = this.miViaje.horario.replace(" ", "T");
    this.mostrar = true;
    this.trazarRuta();
    this.ListarHorarios();
  }
  ListarHorarios() {
    let horario = this.miViaje.horario.split("T");;
    this.HorariosServicio.BuscarHorarioViaje(horario[1]).then((datos) => {
      let dataList = [];
      for (let i = 0; i < datos.array.length; i++) {
        let val: any = {};
        val = datos.array[i];
        val.foto = datos.fotos[i];
        dataList.push(val);
      }
      this.listaHorarios = dataList;
    });
  }
  trazarRuta() {
    debugger;
    this.latD = parseFloat(this.miViaje.latDesde.toString());
    this.latH = parseFloat(this.miViaje.latHasta.toString());
    this.lngD = parseFloat(this.miViaje.lngDesde.toString());
    this.lngH =  parseFloat(this.miViaje.lngHasta.toString());
    this.dir = {
      destination: { lat: this.latH, lng: this.lngH},
      origin: { lat: this.latD, lng: this.lngD },
      travelMode: 'DRIVING',
      transitOptions: {
        departureTime: new Date('2018/03/20 12:00'),
        modes: ['BUS']
      }
    }
  }
  Asignar(horario: any) {
    debugger;
    this.miViaje.remisero = new Remisero(null, null, null, null, null, null, null, null, null, null, null);
    this.miViaje.vehiculo = new Vehiculo(null, null, null, null, null, null, null);
    this.miViaje.estado = 3;
    this.miViaje.remisero.legajo = horario.remisero;
    this.miViaje.vehiculo.id = horario.vehiculo;
    this.ViajesServicio.ActualizarViaje2(this.miViaje).then((datos) => {
     swal({
          title: datos,
          icon: "success",
        });
    })
  }
  cancelar(viaje: Viaje) {
    this.miViaje = viaje;
  }
  Cancelar() {
    this.miViaje.estado = 2;
    this.miViaje.comodidad = this.motivo;
    this.ViajesServicio.ActualizarViaje(this.miViaje).then((datos) => {
      swal({
          title: datos,
          icon: "success",
        });
    })
  }
  Finalizar(viaje: Viaje){
    viaje.estado = 4;
    this.ViajesServicio.ActualizarViaje(viaje).then((datos) => {
      swal({
          title: datos,
          icon: "success",
        });
    })
  }
  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.TIPO = datos.respuesta.tipo;
        this.legajo = datos.respuesta.legajo;
        this.llamaServicePromesa();
      }
    );
  }

}
