import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe }               from 'src/app/models/recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    changedRecipesSubscription: Subscription;
    
    recipes: Recipe[];
    loading: boolean = false;

    constructor(
        private store: Store<fromApp.AppState>,
    ) { }

    ngOnInit(): void {

        this.changedRecipesSubscription = this.store.select('recipes').subscribe(
            (recipesState) => { this.recipes = recipesState.recipes; }
        );

        // if (this.recipes.length === 0) {
        //     this.loading = true;
        //     this.dataStorageService.fetchRecipes().subscribe(
        //         () => this.loading = false,
        //         (error) => this.loading = false
        //     );
        // }

    }

    ngOnDestroy() {
        this.changedRecipesSubscription.unsubscribe();
    }

}
