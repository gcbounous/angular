import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, map, tap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipe.actions';
import { Recipe } from "../../models/recipe.model";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {

    private apiPath = 'https://recipe-book-497f3.firebaseio.com/recipes.json';

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }

    @Effect()
    fetchData = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(
            (fetchDataAction: RecipesActions.FetchData) => {
                return this.http.get<Recipe[]>(this.apiPath)
            }
        ),
        map(recipes => {
            if (!recipes) return [];

            recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });

            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    saveData = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(
            ([actionData, recipesState]) => {
                return this.http.put(this.apiPath, recipesState.recipes);
            }
        ),
    );


}