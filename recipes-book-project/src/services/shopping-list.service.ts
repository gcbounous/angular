import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {

    private ingredients: Ingredient[] = [
		new Ingredient('curcuma', 2),
		new Ingredient('tomato', 10)
	];

    ingredientListChanged = new Subject<Ingredient[]>();
    editingIngredient = new Subject<number>();

	constructor() { }

    getIngredient(index: number): Ingredient {
        if (index < this.ingredients.length) {
            return this.getIngredients()[index];
        }
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(name: string, amount: number) {
        if (amount <= 0){
            alert('Please insert a positive amount.')

        } else if (!name) {
            alert('Please insert a valid name.')

        } else {
            let exists = false;
            let index;

            for (let i = 0; i < this.ingredients.length; i++) {
                if (name.toUpperCase() == this.ingredients[i].name.toUpperCase()) {
                    amount = this.ingredients[i].amount + amount;
                    index = i;
                    exists = true;
                    break;
                }
            }

            if (exists) {
                this.editIngredient(index, name, amount)
            } else {
                this.ingredients.push(new Ingredient(name, amount));
                this.ingredientListChanged.next(this.getIngredients());
            }

        }
    }

    editIngredient(index: number, name: string, amount: number) {
        let ingredient: Ingredient = new Ingredient(name, amount);
        this.ingredients[index] = ingredient;
        this.ingredientListChanged.next(this.getIngredients());
    }

    addIngredientList(ingredientsToAdd: Ingredient[]) {

        for (let i = 0; i < ingredientsToAdd.length; i++) {
            for (let j = 0; j < this.ingredients.length; j++) {
                if (ingredientsToAdd[i].name.toUpperCase() == this.ingredients[j].name.toUpperCase()) {
                    let amount = this.ingredients[j].amount + ingredientsToAdd[i].amount;
                    this.editIngredient(j, this.ingredients[j].name, amount);
                    ingredientsToAdd.splice(i,1);
                    break;
                }
            }
        }

        this.ingredients.push(...ingredientsToAdd);
        this.ingredientListChanged.next(this.getIngredients());
    }

    deleteIngredient(index: number) {
        if(index < this.ingredients.length) {
            this.ingredients.splice(index, 1);
        }
        this.ingredientListChanged.next(this.getIngredients());
    }
}
