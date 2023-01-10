import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environments';
import { authResponse, Usuario } from '../../auth/interfaces/auth.interfaces';


@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private Url: string = environment.baseUrl;
  private _user!: Usuario;

  constructor(private http: HttpClient) { }

  //------------------------------------USUARIOS-----------------------------------------------------------------------------

  // READ - LEER POR UID
  buscarUsuariosPorUid(Uid: string): Observable<Usuario> {
    const url = `${this.Url}/buscar/usuarios/${Uid}`;
    return this.http.get<Usuario>(url);
  }

  // READ - LEER POR NOMBRE
  buscarUsuariosPorNombre(termino: string): Observable<any> {
    const url = `${this.Url}/buscar/usuarios/${termino}`;
    return this.http.get(url);
  }

  // READ - LEER
  buscarUsuarios(): Observable<any> {
    const url = `${this.Url}/usuarios`;
    return this.http.get(url)
  }

  // INSERT - INSERTAR
  insertarUsuario(nombre: string, password: string, correo: string, rol: string) {
    const url = `${this.Url}/usuarios`;
    const body = { nombre, password, correo, rol }
    return this.http.post<authResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.usuario?.estado) {
            this._user = {
              nombre: resp.usuario.nombre,
              uid: resp.usuario.uid
            }
          }
        }),
        // map(resp => resp.usuario?.estado),
        // catchError(err => (err.error.errors[0].msg[0]))
      )
  }

  // UPDATE - EDITAR
  editarUsuario(idt: string, nombre: string, password: string, correo: string, rol: string): Observable<Usuario> {
    const url = `${this.Url}/usuarios/${idt}`;
    const body = { nombre, password, correo, rol }
    return this.http.put<Usuario>(url, body)
  }

  // DELETE - BORRAR
  borrarUsuario(idt: string): Observable<any> {
    const url = `${this.Url}/usuarios/${idt}`;
    return this.http.delete<any>(url)
  }

  //------------------------------------CATEGORIAS-----------------------------------------------------------------------------

  //READ - LEER POR UID
  buscarCategoriaPorUid(id: string): Observable<Usuario> {
    const url = `${this.Url}/buscar/categorias/${id}`;
    return this.http.get<Usuario>(url);
  }

  // READ - LEER POR NOMBRE
  buscarCategoriaPorNombre(termino: string): Observable<any> {
    const url = `${this.Url}/buscar/categorias/${termino}`;
    return this.http.get(url);
  }

  // READ - LEER
  buscarCategorias(): Observable<any> {
    const url = `${this.Url}/categorias`;
    return this.http.get(url)
  }

  // INSERT - INSERTAR
  insertarCategoria(nombre: string) {
    const url = `${this.Url}/categorias/`;
    const body = { nombre }
    return this.http.post<authResponse>(url, body)
  }

  // UPDATE - EDITAR
  editarCategoria(idt: string, nombre: string): Observable<Usuario> {
    const url = `${this.Url}/categorias/${idt}`;
    const body = { nombre }
    return this.http.put<Usuario>(url, body)
  }

  // DELETE - BORRAR
  borrarCategoria(idt: string): Observable<any> {
    const url = `${this.Url}/categorias/${idt}`;
    return this.http.delete<any>(url)
  }

  //------------------------------------PRODUCTOS-----------------------------------------------------------------------------

  //READ - LEER POR UID
  buscarProductoPorUid(id: string): Observable<Usuario> {
    const url = `${this.Url}/buscar/categorias/${id}`;
    return this.http.get<Usuario>(url);
  }
  // READ - LEER POR NOMBRE
  buscarProductoPorNombre(termino: string): Observable<any> {
    const url = `${this.Url}/buscar/productos/${termino}`;
    return this.http.get(url);
  }

  //READ - LEER
  buscarProductos(): Observable<any> {
    const url = `${this.Url}/productos`;
    return this.http.get(url)
  }
  //INSERT - INSERTAR
  insertarProducto(nombre: string, categoria: string, precio: number) {
    const url = `${this.Url}/productos/`;
    const body = { nombre, categoria, precio }
    return this.http.post<authResponse>(url, body)
  }

  // UPDATE - EDITAR
  editarProducto(nombre: string, categoria: string, precio: number): Observable<Usuario> {
    const url = `${this.Url}/productos/${categoria}`;
    const body = { nombre, categoria, precio }
    return this.http.put<Usuario>(url, body)
  }

  //DELETE -BORRAR deleteProduct

  borrarProducto(idt: string): Observable<any> {
    const url = `${this.Url}/productos/${idt}`;
    return this.http.delete<any>(url)
  }
}

//buscarProductoPorNombre

