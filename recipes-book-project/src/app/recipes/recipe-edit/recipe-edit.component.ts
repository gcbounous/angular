import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from 'src/models/recipe.model';
import { RecipesService } from 'src/services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    recipe: Recipe;
    id: number;
    editMode: boolean;

    constructor( private recipesService: RecipesService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => { 
                this.id = +params['id'];
                this.editMode = params != null;

                if (this.editMode){
                    this.recipe = this.recipesService.getRecipe(this.id);
                }
            });
    }

    saveRecipe(name: string, description: string, imgPath: string) {
        if(!this.recipe) {
            this.id = this.recipesService.newRecipe(name, description, imgPath);
        } else {
            this.recipesService.editRecipe(this.id, name, description, imgPath);
        }
        this.router.navigate(['/recipes', this.id])
    }

}
