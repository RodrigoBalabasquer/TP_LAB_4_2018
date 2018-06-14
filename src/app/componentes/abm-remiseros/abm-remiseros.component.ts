import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { VerificarService } from '../../servicios/verificar.service';
import { Usuario } from '../../clases/usuario';
function copiaClave(input: FormControl) {

  if (input.root.get('clave') == null) {
    return null;
  }

  const verificar = input.root.get('clave').value === input.value;
  return verificar ? null : { mismaClave: true };
}
@Component({
  selector: 'app-abm-remiseros',
  templateUrl: './abm-remiseros.component.html',
  styleUrls: ['./abm-remiseros.component.css']
})
export class AbmRemiserosComponent implements OnInit {


  public listadoParaCompartir: Array<any>;
  public miUsuario: Usuario;
  public isvalid: boolean = false;
  miServicioUsuario: UsuariosService;
  miServicioVerificacion: VerificarService
  claveCopia: string;

  usuario = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  nombre = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  apellido = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  sexo = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  clave = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  nacimiento = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  copiaClave = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    copiaClave
  ]);

  registroForm: FormGroup = this.builder.group({
    usuario: this.usuario,
    nombre: this.nombre,
    apellido: this.apellido,
    clave: this.clave,
    copiaClave: this.copiaClave,
    sexo: this.sexo,
    nacimiento: this.nacimiento
  });

  constructor(private router: Router, private builder: FormBuilder, ServicioUsuario: UsuariosService, VerificarService: VerificarService) {
    this.miUsuario = new Usuario(null, null, null, null, null, null, null, null, null, null);
    this.miServicioUsuario = ServicioUsuario;
    this.miServicioVerificacion = VerificarService;
    this.llamaServicePromesa();
  }

  ngOnInit() {
  }
  public llamaServicePromesa() {
    this.miServicioUsuario.listarPersonaPromesa().then(
      (listadoPromesa) => {
      this.listadoParaCompartir = listadoPromesa;
        debugger;
        /*for (let i = 0; i < this.listadoParaCompartir.length; i++) {
          if (this.listadoParaCompartir[i].tipo == "PERRO")
            this.listadoParaCompartir[i].color = "red";
          else
            this.listadoParaCompartir[i].color = "yellow";
        }*/
      }
    );
  }
  Actualizar(event: any)
  {
    this.llamaServicePromesa();
  }
  Registrar() {
    this.miServicioUsuario.RegistrarRemisero(this.miUsuario)
      .then((datos) => {
        if (datos == true) {
          //this.registrarUsuario();
          alert("Usuario registrado con éxito");
          this.router.navigate(['/Principal']);
        }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }
  agregar(){
    this.isvalid=true;
  }
  cancelar(){
    this.isvalid=false;
    this.miUsuario = new Usuario(null,null,null,null,null,null,null,null,null,null);
  }
}
