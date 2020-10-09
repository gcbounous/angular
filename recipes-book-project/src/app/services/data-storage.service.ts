import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model';

import { RecipesService } from './recipes.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

    private apiPath = 'https://recipe-book-497f3.firebaseio.com/recipes.json';

    constructor(private http: HttpClient,
                private recipesService: RecipesService,
                private authService: AuthService ) { }

    saveRecipes(): void{
        this.deleteRecipes();

        const recipes = this.recipesService.getRecipes();
        this.http
            .put(this.apiPath, recipes)
            .subscribe(responseData => {
                console.log(responseData);
            });

    }

    fetchRecipes(): any {

        return this.http
            .get<Recipe[]>(this.apiPath)
            .pipe(
                map(recipes => {
                    if (!recipes) {
                        return [];
                    }

                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap((recipes) => {
                    console.log('recipes');
                    console.log(recipes);
                    this.recipesService.setRecipes(recipes);
                })
            );
    }

    deleteRecipes(): void {
        this.http.delete(this.apiPath).subscribe();
    }

}
