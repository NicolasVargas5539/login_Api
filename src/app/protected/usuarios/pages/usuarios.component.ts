import { Component } from '@angular/core';

import { Usuario } from 'src/app/auth/interfaces/auth.interfaces';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [`
    a{
      cursor: pointer;
    }
  `
  ]
})
export class UsuariosComponent {
  users: Usuario[] = [];
  termino: string = '';

  constructor(private datosService: DatosService) { }

  getUsers() {
    this.datosService.buscarUsuarios()
      .subscribe(resp => {
        this.users = resp.usuarios;
        // console.log(resp.usuarios);
      })
  }
  buscar() {
    console.log(this.termino);

    this.datosService.buscarUsuariosPorNombre(this.termino)
      .subscribe(resp => {
        console.log(resp);
        this.users = resp.results;
      })
  }

}
