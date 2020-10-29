import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipesService } from './recipes.service';

/**
 * This resolver is called when we acces /recepies/{id}, but before loading the component.
 */
@Injectable({
    providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService,
                private recipesService: RecipesService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
        const recipes = this.recipesService.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        }
        return recipes;
    }
}
