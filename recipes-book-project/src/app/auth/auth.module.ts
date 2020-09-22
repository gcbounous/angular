import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from "./auth.component";

import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    { path: '', component: AuthComponent }
];

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AuthModule { }