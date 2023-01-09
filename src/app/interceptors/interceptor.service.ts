import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // coloca el token

    const headers = new HttpHeaders({
      'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2JiNzIwZWRhMzRkMzAwNDc4Zjk1NzkiLCJpYXQiOjE2NzMzMDQxMTcsImV4cCI6MTY3MzMxODUxN30.NJhBGmRuA6B-IlgO73Wfzu7qJ4YuBk8QFpgKbipFrhk'
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone)
  }
}
