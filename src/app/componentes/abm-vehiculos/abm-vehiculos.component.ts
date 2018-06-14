import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { VerificarService } from '../../servicios/verificar.service';
import { Vehiculo } from '../../clases/vehiculo';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { FileSystemFileEntry, FileSystemEntryMetadata, FileSystemEntry, FileSystemDirectoryEntry } from '../../file-Drop/dom.types';
@Component({
  selector: 'app-abm-vehiculos',
  templateUrl: './abm-vehiculos.component.html',
  styleUrls: ['./abm-vehiculos.component.css']
})
export class AbmVehiculosComponent implements OnInit {

  public listadoParaCompartir: Array<any>;
  miServicioVehiculos: VehiculosService;
  miServicioVerificacion: VerificarService;
  public miVehiculo: Vehiculo;
  public isvalid: boolean = false;

  public files: UploadFile[] = [];
  public file: File;

  marca = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  modelo = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  patente = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  registroForm: FormGroup = this.builder.group({
    marca: this.marca,
    patente: this.patente,
    modelo: this.modelo,
  });

  constructor(private router: Router, private builder: FormBuilder, VehiculosService: VehiculosService, VerificarService: VerificarService) {
    this.miServicioVehiculos = VehiculosService;
    this.miServicioVerificacion = VerificarService;
    this.miVehiculo = new Vehiculo(null,null,null,null,null,null);
    this.llamaServicePromesa();
  }
  public llamaServicePromesa() {
    this.miServicioVehiculos.listarVehiculosPromesa().then(
      (listadoPromesa) => {
        this.listadoParaCompartir = listadoPromesa;
      }
    );
  }
  agregar(){
    this.isvalid=true;
  }
  cancelar(){
    this.isvalid=false;
    this.miVehiculo = new Vehiculo(null,null,null,null,null,null);
  }
  Registrar() {
    this.miServicioVehiculos.RegistrarVehiculo(this.miVehiculo,this.file)
      .then((datos) => {
        if (datos == true) {
          //this.registrarUsuario();
          alert("Vehiculo registrado con éxito");
          this.router.navigate(['/Principal']);
        }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }
  ngOnInit() {
  }
  public dropped(event: UploadEvent) {
    this.files = event.files;
    if (this.files[0].fileEntry.isFile) {
      const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;

      fileEntry.file((file: File) => {

        this.file = file;
      });
    }
    else {
      alert("asadasdasd");
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
