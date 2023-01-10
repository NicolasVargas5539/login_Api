import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // coloca el token

    const headers = new HttpHeaders({
      'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2JkNjQyMGI2NTY3ODAwNDliYjQ0ZWMiLCJpYXQiOjE2NzMzNTY3MTgsImV4cCI6MTY3MzM3MTExOH0.Cd-WHTonosQtssEE1qv7bZVTqmLfxyCuF-sVD4thnxE'
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone)
  }
}
