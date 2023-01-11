import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // coloca el token
    let key = localStorage.getItem('token');

    // console.log('interceptors',key)

    const headers = new HttpHeaders({
      'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2JkYzRiMjk0YTBmZjAwNDgzMTQzNTkiLCJpYXQiOjE2NzM0MDcyMTUsImV4cCI6MTY3MzQyMTYxNX0.7oR5ZpIsA3MKTfrJV6InOJppWpxnO_OY94X3zYTj7TE'
      // 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzJhMWQ3ZDgyODVhNTE3NzBiZGVmNTIiLCJpYXQiOjE2NjM3MDU2MjUsImV4cCI6MTY2MzcyMDAyNX0.CSJMib5H-68n-3Mi124LO1wP5nX504ZYi5fN5AOhiS0',
      // 'x-token': key!
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone)

    // return next.handle(reqClone)
  }
}
