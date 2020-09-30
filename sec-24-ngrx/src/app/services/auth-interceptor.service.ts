import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        /**
         * take     : gets only 1 (set by parameter) time the user and closes the user subscription
         * exaustMap: creates an Observable with the value that came from the subscription above
         * map      : manipulates the data comming from the Observable before (from the http.post)
         * tap      : manipulates the data comming from the Observable before without changing it
         */
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.user),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }

                const modifiedReq = req.clone({ params: new HttpParams().append('auth', user.token) });
                return next.handle(modifiedReq);
            })
        );
    }
}