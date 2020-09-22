import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'

import { RecipeResolver } from 'src/app/services/recipe-resolver.service';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [
    {
        path: 'recipes',
        canActivate: [AuthGuard],
        component: RecipesComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver] },
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ],
})
export class RecipesRoutingModule { }