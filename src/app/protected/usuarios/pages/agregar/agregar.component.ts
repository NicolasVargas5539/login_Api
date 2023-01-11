import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { Usuario } from '../../../../auth/interfaces/auth.interfaces';


import { ToastrService } from 'ngx-toastr';
import { DatosService } from '../../../services/datos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  @media (max-width: 450px) {
    label, input, select{
      font-size: 14px;
    }
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private datosService: DatosService,
    private activateRoute: ActivatedRoute) { }

  editarUsuario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rol: ['ADMIN_ROLE', [Validators.required]],
  })

  uId!: Usuario;
  idt: string = '';

  usuario: Usuario = {
    rol: 'ADMIN_ROLE',
    estado: true,
    google: false,
    nombre: '',
    correo: '',
    uid: ''
  }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe(({ id }) => this.idt = id)
  }

  createUser() {
    // console.log(this.editarUsuario.value);
    const { nombre, password, correo, rol } = this.editarUsuario.value;

    // console.log(this.idt);

    if (this.idt) {
      //actualizar
      console.log(this.idt);
      this.datosService.editarUsuario(this.idt, nombre, password, correo, rol,)
        // .subscribe(id => console.log('Actualizando Usuario', id))
        .subscribe(id => {
          if (id) {
            this.router.navigateByUrl('/inicio')
            this.toastr.success('Usuario Editado Correctamente!', 'Genial!');
          } else {
            this.toastr.error("El formulario no pudo ser procesado", 'Error!');
          }
        })
      // console.log(this.idt);
    } else {
      //crear
      this.datosService.insertarUsuario(nombre, password, correo, rol).subscribe(ok => {
        console.log(ok.usuario?.estado)
        if (ok.usuario?.estado === true) {
          this.router.navigateByUrl('/inicio')
          this.toastr.success('Genial!', 'Usuario Creado Correctamente!');
        } else {
          this.toastr.error("El formulario no pudo ser procesado", 'Error!');
        }
      })
    }

  }

  //Borrar
  borrar() {

    this.datosService.borrarUsuario(this.idt)
      .subscribe(resp => {
        if (resp.estado === true) {
          this.router.navigate(['/inicio'], resp)
          this.toastr.success('Usuario Borrado!', 'Informacion!');
        } else {
          this.toastr.error("El formulario no pudo ser procesado", 'Error!');
        }
      })
  }


}
