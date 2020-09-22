import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;
    id: number;

	constructor(private recipesService: RecipesService, 
                private shoppingListService: ShoppingListService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => { 
            this.id = +params['id'];
            this.recipe = this.recipesService.getRecipe(+params['id']);});
	}

    onAddToShoppingList(recipe: Recipe) {
        this.shoppingListService.addIngredientList(recipe.ingredients.slice());
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    }

    onDeleteRecipe() {
        this.recipesService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }

}
