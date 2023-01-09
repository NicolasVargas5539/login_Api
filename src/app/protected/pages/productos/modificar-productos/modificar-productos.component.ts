import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Categoria } from '../../../interfaces/productos';
import { DatosService } from '../../../services/datos.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styles: [`
    .modificar{
      height: 70vh;
    }
    @media (max-width: 450px) {
      .modificar{
        height: 50vh;
      }
    }
  `
  ]
})
export class ModificarProductosComponent implements OnInit {

  constructor(private datosService: DatosService,
              private formBuilder: FormBuilder,
              private activateRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,) { }

  categoria: Categoria[] = []
  idCat: string = ''


  editarProductos: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    categoria: ['', Validators.required],
    precio: [0, Validators.required]
  })


  ngOnInit(): void {
    this.activateRoute.params
      .subscribe(({ id }) => this.idCat = id)
  }

  getCategories() {
    this.datosService.buscarCategorias()
      .subscribe(resp => {
        // console.log(resp)
        this.categoria = resp.categorias;
        // this.idCat = resp.categorias.

      })
  }
  idCateg() {
    console.log()
  }
  createProduct() {
    // console.log('Guardado')
    const { nombre, categoria, precio } = this.editarProductos.value;

    if(this.idCat){
      //ACTUALIZAR
      console.log(this.idCat);
      console.log(this.editarProductos.value)
      this.datosService.editarProducto(nombre, this.idCat, precio)
        .subscribe(resp => {
          if(resp){
            this.router.navigateByUrl('/inicio/categorias')
            this.toastr.success('Categoria ingresada Correctamente!', 'Genial!');
          }
        })
    }else{
      //Crear
      console.log(this.editarProductos.value)

      this.datosService.insertarProducto(nombre, categoria, precio)
        .subscribe(resp =>{
          console.log(this.editarProductos.value)
          if(resp){
            this.router.navigateByUrl('/inicio/productos')
            this.toastr.success('Producto ingresado Correctamente!', 'Genial!');
          }
        })
    }
  }
}
