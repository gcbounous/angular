import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'abc')});

        return next.handle(modifiedRequest);
    }
}

