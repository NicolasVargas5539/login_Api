import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Categoria, Usuario } from '../../../interfaces/interfaces';
import { DatosService } from '../../../services/datos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styles: [
  ]
})
export class ModificarComponent {

  constructor( private formBuilder: FormBuilder,
                private activateRoute: ActivatedRoute,
                private datosService: DatosService,
                private toastr: ToastrService,
                private router: Router,){}

  editarCategoria: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required]
  })

  categoria! : Categoria;
  idc: string = '';

  user: Usuario = {
    _id: '',
    nombre: ''
  }
  categ: Categoria = {
    _id: '',
    nombre: '',
    usuario: this.user
  }
  ngOnInit(): void {
    this.activateRoute.params
      .subscribe(({ id }) => this.idc = id)
  }

  createCategory(){
    // console.log('Creando')

    const { nombre } = this.editarCategoria.value;

    if (this.idc){
      //Actualizar
      console.log(this.idc);

      this.datosService.editarCategoria(this.idc, nombre)
        .subscribe( id => {
          if(id){
            this.router.navigateByUrl('/inicio/categorias')
            this.toastr.success('Categoria ingresada Correctamente!', 'Genial!');
          }
        })
    }else{
      //Crear
      this.datosService.insertarCategoria(nombre)
        .subscribe(ok => {
          if(ok){
            this.router.navigateByUrl('/inicio/categorias')
            this.toastr.success('Categoria ingresada Correctamente!', 'Genial!');
          }
        })
    }
  }

  deleteCategory() {

    this.datosService.borrarCategoria(this.idc)
      .subscribe(resp => {
        console.log(resp)
        if (resp.estado === true){
          this.router.navigate(['/inicio/categorias'], resp)
          this.toastr.success('Usuario Borrado!', 'Informacion!');
        }else {
          this.router.navigate(['/inicio/categorias'], resp);
        }
      })
  }

}
