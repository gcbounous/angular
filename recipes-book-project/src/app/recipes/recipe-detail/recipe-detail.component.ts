import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	recipe: Recipe;

	constructor(private recipesService: RecipesService, 
                private shoppingListService: ShoppingListService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
        // this.recipesService.recipeSelected.subscribe( 
        //     (selectedRecipe) => {this.recipe = selectedRecipe;} 
        // );
        this.activatedRoute.params.subscribe((params: Params) => { this.recipe = this.recipesService.getRecipe(params['id']);});
	}

    onAddToShoppingList(recipe: Recipe) {
        this.shoppingListService.addIngredientList(recipe.ingredients);
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    }

}
