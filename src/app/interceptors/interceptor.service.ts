import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // coloca el token
    let key = localStorage.getItem('token');

    console.log('interceptors',key)

    // const headers = new HttpHeaders({
    //   'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2JkYzRiMjk0YTBmZjAwNDgzMTQzNTkiLCJpYXQiOjE2NzMzODUyNjAsImV4cCI6MTY3MzM5OTY2MH0.2F3TtgzO8wo-M2VGcDYglV2QGg3GR1ksoEOros6jMp0'
    // });
    const headers = new HttpHeaders({
      'x-token': key!
   });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone)
  }
}
