import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[];
    changedRecipesSubscription: Subscription;

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
      this.changedRecipesSubscription = this.recipeService.changedRecipes.subscribe(
        (recipes: Recipe[]) => { this.recipes = recipes;}
    );
  }

  ngOnDestroy() {
      this.changedRecipesSubscription.unsubscribe();
  }

  selectRecipe(recipe) {
    this.recipeService.selectRecipe(recipe);
  }

}
