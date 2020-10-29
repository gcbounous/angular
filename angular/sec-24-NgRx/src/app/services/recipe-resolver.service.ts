import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from "@ngrx/effects";
import { take, map, switchMap } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model'
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';

/**
 * This resolver is called when we acces /recepies/{id}, but before loading the component.
 */
@Injectable({
    providedIn: 'root' 
})
export class RecipeResolver implements Resolve<Recipe[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
    ){}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => recipesState.recipes),
            switchMap(
                recipes => {
                    if (recipes.length === 0) {
                        this.store.dispatch(new RecipeActions.FetchData());
                        return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
                    }
                    return of(recipes);
                }
            )
        );
    }
}
