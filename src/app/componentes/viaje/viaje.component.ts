import { Component, OnInit } from '@angular/core';
//import { ViajesService } from '../../servicios/viajes.service';
import { HttpService } from '../../servicios/http.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

  //miViaje: ViajesService;
  mihttp: HttpService;
  direccionDesde: string = "";
  direccionHasta: string = "";
  latDesde: Number = 0;
  lngDesde: Number = 0;
  latHasta: Number = 0;
  lngHasta: Number = 0;
  zoom: Number = 14;

  dir = undefined;
  constructor(http: HttpService) {
    this.mihttp = http;
  }

  Trazar() {
    this.mihttp.httpGetP(this.direccionDesde)
      .then(data => {
        debugger;
        this.latDesde = data.lat;
        this.lngDesde = data.lng;
        this.mihttp.httpGetP(this.direccionHasta)
          .then(data => {
            debugger;
            this.latHasta = data.lat;
            this.lngHasta = data.lng;
            this.trazarRuta();
          }).catch(err => {
            console.log(err);
            return null;
          });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }
  trazarRuta() {
    debugger;
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
  ngOnInit() {
  }

}
