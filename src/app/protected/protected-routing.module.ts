import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarComponent } from './usuarios/pages/agregar/agregar.component';
import { CategoriasComponent } from './pages/categorias/categorias/categorias.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModificarComponent } from './pages/categorias/modificar/modificar.component';
import { ModificarProductosComponent } from './pages/productos/modificar-productos/modificar-productos.component';
import { ProductosComponent } from './pages/productos/productos/productos.component';
import { UsuariosComponent } from './usuarios/pages/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    children: [
      { path: '', component: UsuariosComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'editar/:id', component: AgregarComponent },
      { path: 'crear', component: AgregarComponent },
      { path: 'categorias/editar-categoria/:id', component: ModificarComponent },
      { path: 'categorias/crear-categoria', component: ModificarComponent },
      { path: 'productos/editar-producto/:id', component: ModificarProductosComponent },
      { path: 'productos/crear-producto', component: ModificarProductosComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
