import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

    private recipes: Recipe[];

    changedRecipes = new Subject<Recipe[]>();

    constructor() {
        // this.recipes = this.setUpRecipes();
    }

    getRecipes(): Recipe[] {
        if (this.recipes) {
            return this.recipes.slice();
        }
    }

    getRecipe(index: number): Recipe {
        if (index < this.recipes.length){
            return this.recipes[index];
        }
    }

    setRecipes(newRecipeList: Recipe[]): void {
        this.recipes = newRecipeList;
        this.changedRecipes.next(this.getRecipes());
    }

    newRecipe(recipe: Recipe): number {
        this.recipes.push(recipe);
        this.changedRecipes.next(this.getRecipes());
        return this.getRecipes().length - 1;
    }

    editRecipe(index: number, recipe: Recipe): void {
        if (index < this.recipes.length) {
            this.recipes[index] = recipe;
            this.changedRecipes.next(this.getRecipes());
        }
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.changedRecipes.next(this.getRecipes());
    }

    private setUpRecipes(): Recipe[] {
        const milk = new Ingredient('milk', 2);
        const sugar = new Ingredient('sugar', 10);
        const egg = new Ingredient('egg', 6);
        const curcuma = new Ingredient('curcuma', 2);
        const tomato = new Ingredient('tomato', 100);

        const recipe1 = new Recipe('Eggs with sauce', 'green eggs with ham', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg', [milk, sugar, egg]);
        const recipe2 = new Recipe('Panquecas', 'hummmm panquecas são crêpes enroladas, com molho de tomate e gratinadas no forno.', 'https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg', [milk, egg, curcuma, tomato]);

        return [recipe1, recipe2];
    }
}
