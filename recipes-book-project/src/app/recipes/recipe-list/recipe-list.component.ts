import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    changedRecipesSubscription: Subscription;

    recipes: Recipe[];
    loading = false;

    constructor(private recipeService: RecipesService,
                private dataStorageService: DataStorageService) { }

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
        this.changedRecipesSubscription = this.recipeService.changedRecipes.subscribe(
            (recipes: Recipe[]) => { this.recipes = recipes; }
        );

        if (!this.recipes) {
            this.loading = true;
            this.dataStorageService.fetchRecipes().subscribe(
                () => this.loading = false,
                (error) => this.loading = false
            );
        }

    }

    ngOnDestroy(): void {
        this.changedRecipesSubscription.unsubscribe();
    }

}
