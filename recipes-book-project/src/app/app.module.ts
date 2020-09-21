import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header/header.component';
import { AuthComponent }            from './auth/auth.component'
import { LoadingSpinnerComponent }  from '../shared/loading-spinner/loading-spinner.component';
import { AlertComponent }           from '../shared//alert/alert.component';

import { DropdownDirective } from 'src/directives/dropdown.directive';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';

import { AppRoutesModule } from "./app-routing.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutesModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
