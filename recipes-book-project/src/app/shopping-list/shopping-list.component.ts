import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from "@ngrx/store";

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';


@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Observable<{ingredients: Ingredient[]}>;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    ) { }

    ngOnInit(): void {
        this.ingredients = this.store.select('shoppingList');

        // this.ingredients = this.shoppingListService.getIngredients();

        // this.ingredientListChangedSubscription = this.shoppingListService.ingredientListChanged.subscribe(
        //     (ingredientList: Ingredient[]) => { this.ingredients = ingredientList; }
        // );
    }

    ngOnDestroy() {
        // this.ingredientListChangedSubscription.unsubscribe();
    }

    onEditIngredient(index) {
        this.shoppingListService.editingIngredient.next(index);
    }
}
