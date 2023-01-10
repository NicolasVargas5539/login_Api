import { Component } from '@angular/core';

import { DatosService } from '../../../services/datos.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [`
    a{
      cursor: pointer;
    }
  `
  ]
})
export class ProductosComponent {
  products: any = [];
  termino: string = '';

  constructor(private datosService: DatosService) { }

  getProductos() {
    this.datosService.buscarProductos()
      .subscribe(resp => {
        this.products = resp.productos;
        // console.log(resp);
      })
  }
  buscar() {
    console.log(this.termino);

    this.datosService.buscarProductoPorNombre(this.termino)
      .subscribe(resp => {
        console.log(resp);
        this.products = resp.results;
      })
  }

}
