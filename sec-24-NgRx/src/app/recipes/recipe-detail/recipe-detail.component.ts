import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;
    id: number;

	constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private store: Store<fromApp.AppState>
    ) { }

	ngOnInit(): void {
        this.activatedRoute.params.pipe(
            map(params => this.id = +params['id']),
            switchMap(() => this.store.select('recipes')),
            map(recipesState => recipesState.recipes[this.id] )
        ).subscribe( recipe => this.recipe = recipe);
	}

    onAddToShoppingList(recipe: Recipe) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipe.ingredients));
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    }

    onDeleteRecipe() {
        this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
        this.router.navigate(['/recipes']);
    }

}
