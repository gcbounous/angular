import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    recipeForm: FormGroup;

    id: number;
    editMode: boolean;
    imgPath: string;

    constructor( private recipesService: RecipesService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => { 
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            });
    }

    /* --- Events --- */

    onSaveRecipe() {
        console.log(this.recipeForm);

        let name = this.recipeForm.value.name;
        let description = this.recipeForm.value.description;
        let imgPath = this.recipeForm.value.imagePath;
        let ingredients: Ingredient[] = [];

        for (let ing of this.recipeForm.value.ingredients) {
            if (ing.name && ing.amount > 0) {
                ingredients.push(new Ingredient(ing.name, ing.amount));
            }
        }

        if (this.editMode) {
            this.recipesService.editRecipe(this.id, this.recipeForm.value);
        } else {
            this.id = this.recipesService.newRecipe(this.recipeForm.value);
        }

        this.router.navigate(['/recipes', this.id]);
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onAddIngredient() {
        const control = this.createIngredientFormGroup();
        (<FormArray>this.recipeForm.get('ingredients')).push(control);
    }

    onRemoveIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onImgPathChange(img: string) {
        this.imgPath = img;
    }

    /* --- Getters --- */

    get ingredientControls() { // a getter!
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    /* --- Private Functions --- */

    private initForm() {
        let name = '';
        let description = '';
        let imgPath ='https://www.shareicon.net/data/2016/06/22/784585_food_512x512.png';
        let ingredients = [];

        if (this.editMode) {
            let recipe: Recipe = this.recipesService.getRecipe(this.id);
            name = recipe.name;
            description = recipe.description;
            imgPath = recipe.imagePath;

            for (let ing of recipe.ingredients) {
                ingredients.push(this.createIngredientFormGroup(ing.name, ing.amount))
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(name, Validators.required),
            'description': new FormControl(description, Validators.required),
            'imagePath': new FormControl(imgPath, Validators.required),
            'ingredients': new FormArray(ingredients),
        });

        this.imgPath = imgPath;
    }

    private createIngredientFormGroup(name: string = '', amount: number = 1): FormGroup {
        return new FormGroup({
            'name': new FormControl(name, Validators.required),
            'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        });
    }

}
