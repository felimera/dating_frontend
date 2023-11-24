import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  url401 = '';
  reload = 0;

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('TOKEN')
    const apiReq = req.clone({
      headers: req.headers.set('Authorization', token !== null ? 'Bearer ' + token : '')
    });
    return next.handle(apiReq);
  }
}
