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

  listaViajes: Array<Viaje> = [];
  listaHorarios: Array<any> = [];
  miViaje: Viaje;
  mostrar:boolean = false;
  dir = undefined;
   constructor(private router: Router, public http: HttpService, public ViajesServicio: ViajesService,public HorariosServicio: HorarioService, public verificarService: VerificarService) {
  }
  public llamaServicePromesa() {
    this.ViajesServicio.listarViajesPromesa().then(
      (listadoPromesa) => {
        debugger;
        this.listaViajes = listadoPromesa;
      }
    );
  }
  Ver(viaje:Viaje)
  { 
    this.miViaje = new Viaje(viaje.id,null,null,viaje.legajoCliente,viaje.latDesde,viaje.latHasta,viaje.lngDesde,viaje.lngHasta,viaje.duracion,viaje.distancia,viaje.precio,viaje.cantidad
    ,viaje.comodidad,viaje.medioDePago,viaje.estado,viaje.horario);
    this.miViaje.horario = this.miViaje.horario.replace(" ","T");
    this.mostrar = true;
    this.trazarRuta();
    this.ListarHorarios();
  }
  ListarHorarios()
  { 
    let horario = this.miViaje.horario.split("T");;
    this.HorariosServicio.BuscarHorarioViaje(horario[1]).then((datos)=>{
      let dataList = [];
      for(let i = 0;i<datos.array.length;i++)
      {
        let val :any= {};
        val = datos.array[i];
        val.foto = datos.fotos[i];
        dataList.push(val);
      }
      this.listaHorarios = dataList;
    });
  }
  trazarRuta() {
    this.dir = {
      destination: { lat: this.miViaje.latHasta, lng: this.miViaje.lngHasta },
      origin: { lat: this.miViaje.latDesde, lng: this.miViaje.lngDesde },
      travelMode: 'DRIVING',
      transitOptions: {
        departureTime: new Date('2018/03/20 12:00'),
        modes: ['BUS']
      }
    }
  }
  Asignar(horario: any)
  { 
    debugger;
    this.miViaje.remisero = new Remisero(null,null,null,null,null,null,null,null,null,null,null);
    this.miViaje.vehiculo = new Vehiculo(null,null,null,null,null,null,null);
    this.miViaje.estado = 3;
    this.miViaje.remisero.legajo = horario.remisero;
    this.miViaje.vehiculo.id = horario.vehiculo;
    this.ViajesServicio.ActualizarViaje2(this.miViaje).then((datos)=>{
      alert(datos);
    })
  }
  Cancelar(viaje : Viaje)
  { 
    viaje.estado = 2;
    this.ViajesServicio.ActualizarViaje(viaje).then((datos)=>{
      debugger;
      alert(datos);
    })
  }
  ngOnInit() {
    this.llamaServicePromesa();
  }

}
