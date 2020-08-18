import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { PageErrorComponent } from './page-error/page-error.component';
import { ServerResolver } from './server-resolver.service';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'users', component: UsersComponent,
        children: [
            { path: ':id/:name', component: UserComponent },
        ]
    },
    {
        path: 'servers', 
        component: ServersComponent,
        // canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: PageErrorComponent, data: {message: 'Page not found! 404 in your face!'} },
    { path: '**', redirectTo: '/not-found' } // Must be last because ** means anything (in this case it will be any path not found)
];

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
