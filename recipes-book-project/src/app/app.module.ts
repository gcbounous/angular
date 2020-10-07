import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
    
import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header/header.component';

import { AppRoutesModule }      from "./app-routing.module";
import { SharedModule }         from './shared/shared.module';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        AppRoutesModule,
        // RecipesModule,       -> Lazy loaded is router
        // ShoppingListModule,  -> Lazy loaded is router
        // AuthModule,          -> Lazy loaded is router
        SharedModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
