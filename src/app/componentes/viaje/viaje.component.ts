import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ViajesService } from '../../servicios/viajes.service';
import { VerificarService } from '../../servicios/verificar.service';
import { HttpService } from '../../servicios/http.service';
import { Viaje } from '../../clases/viaje';
import swal from 'sweetalert';
//import { Remisero} from '../../clases/remisero';
//import { Vehiculo} from '../../clases/vehiculo';




@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css'],
})
export class ViajeComponent implements OnInit {

  gif = false;
  repetidor: any;

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
  captcha: any = {};
  captch: string = "";
  captchConfirm: boolean = false;

  miViaje: Viaje;
  miViajeServicio: ViajesService;
  verificarService: VerificarService;
  mihttp: HttpService;

  localidadDesde: string = "Lanus";
  calleDesde: string = "Pichincha";
  numeroDesde: string = "1273";
  localidadHasta: string = "Lanus";
  calleHasta: string = "Sitio de montevideo";
  numeroHasta: string = "2093";
  direccionDesde: string = "";
  direccionHasta: string = "";
  horario: string = "";
  legajo: number;
  ruta = false;


  latDesde: number = 0;
  lngDesde: number = 0;
  latHasta: number = 0;
  lngHasta: number = 0;
  duracion: number = 1;
  distancia: number = 0;
  precio: number = 0;
  cant: number = 1
  medioDePago: string = "efectivo";
  comodidad: string = "";
  zoom: Number = 14;

  //private exponentialStrength: ExponentialStrengthPipe; 

  dir = undefined;
  constructor(private router: Router, http: HttpService, ViajesServicio: ViajesService, verificarService: VerificarService) {
    this.miViaje = new Viaje(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.mihttp = http;
    this.miViajeServicio = ViajesServicio;
    this.verificarService = verificarService;
  }
  confirmarCaptcha() {
    if (this.captch == this.captcha.value)
      this.captchConfirm = true;
  }
  Trazar() {
    this.direccionDesde = this.localidadDesde + "-" + this.calleDesde.replace(/\s/g, "-") + "-" + this.numeroDesde;
    this.direccionHasta = this.localidadHasta + "-" + this.calleHasta.replace(/\s/g, "-") + "-" + this.numeroHasta;
    this.mihttp.httpGetRuta(this.direccionDesde, this.direccionHasta)
      .then(data => {
        this.latDesde = data.origin.lat;
        this.lngDesde = data.origin.lng;
        this.latHasta = data.destination.lat;
        this.lngHasta = data.destination.lng;
        this.duracion = Math.round(data.duration.value);
        this.distancia = Math.round(data.distance.value);
        this.precio = ((this.distancia * 2) / 100);
        this.trazarRuta();
      });
  }
  trazarRuta() {
    this.ruta = true;
    this.dir = {
      destination: { lat: this.latHasta, lng: this.lngHasta },
      origin: { lat: this.latDesde, lng: this.lngDesde },
      travelMode: 'DRIVING',
      transitOptions: {
        departureTime: new Date('2018/03/20 12:00'),
        modes: ['BUS']
      }
    }
  }
  Crearviaje() {
    this.gif = true;
    this.repetidor = setInterval(() => {
      this.miViaje.cantidad = this.cant;
      this.miViaje.comodidad = this.comodidad;
      this.miViaje.distancia = this.distancia;
      this.miViaje.duracion = this.duracion;
      this.miViaje.horario = this.horario.replace("T", " ");
      this.miViaje.latDesde = this.latDesde;
      this.miViaje.latHasta = this.latHasta;
      this.miViaje.legajoCliente = this.legajo;
      this.miViaje.lngDesde = this.lngDesde;
      this.miViaje.lngHasta = this.lngHasta;
      this.miViaje.medioDePago = this.medioDePago;
      this.miViaje.precio = this.precio;
      this.miViajeServicio.RegistrarViaje(this.miViaje).then(
        (datos) => {
          this.gif = false;
          clearInterval(this.repetidor);
          swal({
            title: "Viaje registrado",
            icon: "success",
          });
          this.router.navigate(['/Principal']);
        }
      );
    }, 3000);
  }
  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.legajo = datos.respuesta.legajo;
      });
    this.captcha = this.captchas[Math.floor((Math.random() * 3) + 1) - 1];
  }

}
