import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from "rxjs/operators";
import { of } from 'rxjs';

import { environment } from '../../../environments/environments';
import { authResponse, Usuario } from '../interfaces/auth.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Url: string = environment.baseUrl;
  private _user!: Usuario;
  public key: any = ''

  constructor(private http: HttpClient) { }

  login(correo: string, password: string) {
    const url = `${this.Url}/auth/login`;
    const body = { correo, password }
    return this.http.post<authResponse>(url, body)
    //importante el orden
      .pipe(
      tap(resp => {
          if( resp.usuario?.estado ){
            localStorage.setItem('token', resp.token!) // token guardado en el local storage
            // this.key.setItem('token', resp.token!)
            this._user = {
              nombre: resp.usuario.nombre,
              uid: resp.usuario.uid
            }
          }
      }),
      map(resp => resp.usuario?.estado),
      //captura el error y muestra el mensaje.
      catchError(err => of(err.error.msg))
    )
  }
}

