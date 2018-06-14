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
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public miUsuario: Usuario;
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
  }

  ngOnInit() {
  }
  cancelar() {
    this.router.navigate(['/Login']);
  }
  Registrar() {
    this.miServicioUsuario.RegistrarCliente(this.miUsuario)
      .then((datos) => {
        if (datos == true) {
          this.registrarUsuario();
        }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }
  registrarUsuario() {
    this.miServicioUsuario.BuscarUsuario(this.miUsuario.usuario, this.miUsuario.contrasenia)
      .then((datos) => {
        if (datos != null) {
          datos;
          //localStorage.setItem("token",JSON.stringify(datos));
          //this.router.navigate(['/Principal']);
          this.crearToken(datos);
        }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Datos incorrectos"); }
      );
  }

  crearToken(datos: any) {
    this.miServicioVerificacion.crearToken(datos).then((datos) => {
      if (datos == true)
        this.router.navigate(['/Principal']);
    })
  }
}
