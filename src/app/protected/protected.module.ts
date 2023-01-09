import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';

import { AgregarComponent } from './usuarios/pages/agregar/agregar.component';
import { CategoriasComponent } from './pages/categorias/categorias/categorias.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UsuariosComponent } from './usuarios/pages/usuarios.component';
import { ModificarComponent } from './pages/categorias/modificar/modificar.component';
import { ProductosComponent } from './pages/productos/productos/productos.component';
import { ModificarProductosComponent } from './pages/productos/modificar-productos/modificar-productos.component';


@NgModule({
  declarations: [
    AgregarComponent,
    CategoriasComponent,
    DashboardComponent,
    NavbarComponent,
    ProductosComponent,
    UsuariosComponent,
    ModificarComponent,
    ModificarProductosComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProtectedModule { }
