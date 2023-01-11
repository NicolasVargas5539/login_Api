import { Component } from '@angular/core';

import { DatosService } from '../../../services/datos.service';
import { Categoria } from 'src/app/protected/interfaces/interfaces';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [`
    a{
      cursor: pointer;
    }
  `
  ]
})
export class CategoriasComponent {
  categories: Categoria[] = [];
  termino: string = '';

  constructor(private datosService: DatosService) { }

  getCategories() {
    this.datosService.buscarCategorias()
      .subscribe(resp => {
        this.categories = resp.categorias;
        //  console.log(resp);
      })
  }

  buscar() {
    // console.log(this.termino);

    this.datosService.buscarCategoriaPorNombre(this.termino)
      .subscribe(resp => {
        this.categories = resp.results;
        // console.log(this.categories)
      })

  }
}
