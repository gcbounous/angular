import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe }               from 'src/models/recipe.model';
import { RecipesService }       from 'src/services/recipes.service';
import { DataStorageService }   from 'src/services/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    changedRecipesSubscription: Subscription;
    
    recipes: Recipe[];
    loading: boolean = false;

    constructor(private recipeService: RecipesService,
                private dataStorageService: DataStorageService) { }

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
        this.changedRecipesSubscription = this.recipeService.changedRecipes.subscribe(
            (recipes: Recipe[]) => { this.recipes = recipes;}
        );
        
        if (!this.recipes) {
            this.loading = true;
            this.dataStorageService.fetchRecipes().subscribe(() => this.loading = false);
        }

    }

    ngOnDestroy() {
        this.changedRecipesSubscription.unsubscribe();
    }

}
