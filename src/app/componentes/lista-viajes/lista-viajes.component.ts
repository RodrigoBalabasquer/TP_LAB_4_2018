import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ViajesService } from '../../servicios/viajes.service';
import { VerificarService } from '../../servicios/verificar.service';
import { HttpService } from '../../servicios/http.service';
import { Viaje } from '../../clases/viaje';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.css']
})
export class ListaViajesComponent implements OnInit {

  listaViajes: Array<Viaje> = [];
  legajo: number;
  miViaje: Viaje;
  mostrar = false;
  dir = undefined;

  localidadDesde:string ="";
  calleDesde:string ="";
  numeroDesde:string ="";
  localidadHasta:string ="";
  calleHasta:string ="";
  numeroHasta:string ="";
  direccionDesde: string = "";
  direccionHasta: string = "";

  captchas = [
    {
      img: "captcha1.png",
      value: "Mr Blocked"
    },
    {
      img: "captcha2.png",
      value: "upxbpjh"
    },
    {
      img: "captcha3.png",
      value: "smwm"
    }
  ];
  captcha : any= {};
  captch: string = "";
  captchConfirm: boolean = false;

  constructor(private router: Router, public http: HttpService, public ViajesServicio: ViajesService, public verificarService: VerificarService) {
    this.miViaje =  new Viaje(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  }
  confirmarCaptcha()
  { 
    if(this.captch == this.captcha.value)
      this.captchConfirm = true;
  }
  public llamaServicePromesa() {
    this.ViajesServicio.listarViajesRemiseroPromesa(this.legajo).then(
      (listadoPromesa) => {
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
  }
  Trazar() {
    this.direccionDesde = this.localidadDesde+"-"+this.calleDesde.replace(/\s/g,"-")+"-"+this.numeroDesde;
    this.direccionHasta = this.localidadHasta+"-"+this.calleHasta.replace(/\s/g,"-")+"-"+this.numeroHasta;
    this.http.httpGetRuta(this.direccionDesde,this.direccionHasta)
    .then(data => {
      this.miViaje.latDesde = data.origin.lat;
      this.miViaje.lngDesde = data.origin.lng;
      this.miViaje.latHasta = data.destination.lat;
      this.miViaje.lngHasta = data.destination.lng;
      this.miViaje.duracion = Math.round(data.duration.value);
      this.miViaje.distancia = Math.round(data.distance.value);
      this.miViaje.precio = ((this.miViaje.distancia * 2)/100);
      this.trazarRuta();
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
  Actualizar()
  {
    this.ViajesServicio.ActualizarViaje(this.miViaje).then((datos)=>{
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
    this.captcha = this.captchas[Math.floor((Math.random() * 3) + 1) - 1];
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.legajo = datos.respuesta.legajo;
        this.llamaServicePromesa();
      });
  }

}
