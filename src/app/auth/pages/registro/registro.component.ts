import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatosService } from '../../../protected/services/datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [`
  .link-info{
    transition: 0.5s !important;
  }
  .link-info:hover{
    color:#105dd0 !important;
  }
  input{
    font-size: 14px;
  }
  `
  ]
})
export class RegistroComponent {

  constructor(private formBuilder: FormBuilder,
            private datosService: DatosService,
            private router: Router,
            private toastr: ToastrService,){}


  editarUsuario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rol: ['ADMIN_ROLE', [Validators.required]],
  })

  createUser(){
    const { nombre, password, correo, rol } = this.editarUsuario.value;

    this.datosService.insertarUsuario(nombre, password, correo, rol)
      .subscribe(ok => {
        console.log(ok.usuario?.estado)
        if (ok.usuario?.estado === true) {
          this.router.navigateByUrl('/inicio/usuarios')
          this.toastr.success('Genial!', 'Usuario Creado Correctamente!');
        }
        // else {
          // this.toastr.error("El formulario no pudo ser procesado", 'Error!');
        // }
      })
  }
}
