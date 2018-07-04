import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../servicios/viajes.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  mes: number = 7;
  anio: number = 2018;
  listaDeDatos: Array<any> = [];
  mostrar = false;
  public gif = false;
  repetidor: any;
  constructor(public miViajesService: ViajesService) { }
  buscar() {
    this.listaDeDatos = [];
    this.llamaServices();
  }
  llamaServices() {
    this.gif = true;
    this.repetidor = setInterval(() => {
      this.miViajesService.traerInformes(this.mes, this.anio).then((datos) => {
        for (let i = 0; i < datos.length; i++) {
          var item: any = {};
          item.Cliente = datos[i].Cliente;
          item.MedioPago = datos[i].MedioPago;
          item.Mensaje = datos[i].Comodidad;
          item.Precio = '$' + datos[i].Precio;
          item.Pasajeros = datos[i].Pasajeros;
          item.Duracion = datos[i].Duracion + " minutos";
          item.Distancia = datos[i].Distancia + " metros";
          item.Horario = datos[i].Horario;
          item.Remisero = datos[i].Remisero == null ? "No asignado" : datos[i].Remisero + " N° legajo: " + datos[i].LegajoRemisero;
          //item.LegajoRemisero = datos[i].LegajoRemisero == null ? 0:datos[i].LegajoRemisero;
          item.Vehiculo = datos[i].Vehiculo == null ? "No asignado" : datos[i].Vehiculo + " patente: " + datos[i].Patente;
          //item.Patente = datos[i].Patente == null ? "":datos[i].Patente;
          switch (datos[i].Estado) {
            case "1":
              item.Estado = "Iniciado";
              break;
            case "2":
              item.Estado = "Cancelado";
              break;
            case "3":
              item.Estado = "En proceso";
              break;
            case "4":
              item.Estado = "Finalizado";
              break;
          }
          this.listaDeDatos.push(item);
        }
        this.mostrar = true;
        this.gif = false;
        clearInterval(this.repetidor);
      });
    }, 3000);
  }
  ExportarCSV() {
    this.gif = true;
    this.repetidor = setInterval(() => {
      const options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: ',',
        showLabels: true,
        showTitle: false,
        useBom: true,
        headers: ['Cliente',
          'Horario',
          'Precio',
          'Medio de pago',
          'Distancia',
          'Duracion',
          'Cantidad de Pasajeros',
          'Estado',
          'Mensaje',
          'Remisero',
          'Vehiculo']
      };
      var data: Array<any> = [];
      for (let i = 0; i < this.listaDeDatos.length; i++) {
        var dato = {
          Cliente: this.listaDeDatos[i].Cliente,
          Horario: this.listaDeDatos[i].Horario,
          Precio: this.listaDeDatos[i].Precio,
          MedioPago: this.listaDeDatos[i].MedioPago,
          Distancia: this.listaDeDatos[i].Distancia,
          Duracion: this.listaDeDatos[i].Duracion,
          Cantidad: this.listaDeDatos[i].Pasajeros,
          Estado: this.listaDeDatos[i].Estado,
          Mensaje: this.listaDeDatos[i].Mensaje,
          Remisero: this.listaDeDatos[i].Remisero,
          Vehiculo: this.listaDeDatos[i].Vehiculo
        }
        data.push(dato);
      }
      new Angular2Csv(data, 'Usuarios', options);
      this.gif = false;
      clearInterval(this.repetidor);
    }, 3000);
  }
  ngOnInit() {
  }

}
