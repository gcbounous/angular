import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
    HttpClientModule,
    HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
    
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutesModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from "./auth/store/auth.effects";
import { environment } from "../environments/environment";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutesModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot(),
        // RecipesModule,       -> Lazy loaded in router
        // ShoppingListModule,  -> Lazy loaded in router
        // AuthModule,          -> Lazy loaded in router
        SharedModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
