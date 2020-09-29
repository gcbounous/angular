import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/models/ingredient.model';
import * as shoppingListActions from "../store/shopping-list.actions";
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('shoppingForm', {static: true}) shoppingForm: NgForm;

    editMode: boolean = false;
    igredientIndex: number;
    editSubscription: Subscription;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<fromShoppingList.AppState>
    ) { }

	ngOnInit(): void {
        this.editSubscription = this.store.select('shoppingList').subscribe( state => {
            if(state.editedIngredientIndex >= 0) {
                this.editMode = true;
                this.igredientIndex = state.editedIngredientIndex;

                let ingredient: Ingredient = state.editedIngredient;
                this.shoppingForm.form.setValue({ 'name': ingredient.name, 'amount': ingredient.amount });
            } else {
                this.editMode = false;
            }   
        });


        // this.editSubscription = this.shoppingListService.editingIngredient.subscribe(
        //     (index: number) => {
        //         this.igredientIndex = index;

        //         let ingredient: Ingredient = this.shoppingListService.getIngredient(index);
        //         this.shoppingForm.form.setValue({'name':ingredient.name, 'amount': ingredient.amount});
        //         this.editMode = true;
        //     }
        // );
    }

    ngOnDestroy() {
        this.editSubscription.unsubscribe();
        this.store.dispatch(new shoppingListActions.StopEdit());
    }

    loadItemToEdit(index: number) {

    }

    onSubmit() {
        console.log(this.shoppingForm);

        let formValues = this.shoppingForm.form.value;
        if (this.editMode) {
            // this.shoppingListService.editIngredient(this.igredientIndex, formValues.name, formValues.amount)
            this.store.dispatch(new shoppingListActions.UpdateIngredient( new Ingredient(formValues.name, formValues.amount)));
        } else {
            // this.shoppingListService.addIngredient(formValues.name, formValues.amount);
            let ingredient = new Ingredient(formValues.name, formValues.amount);
            this.store.dispatch(new shoppingListActions.AddIngredient(ingredient));
        }

        this.onClearForm();
    }

    onClearForm() {
        this.shoppingForm.resetForm();
        this.editMode = false;
        this.store.dispatch(new shoppingListActions.StopEdit());
    }

    onDeleteItem() {
        if (this.editMode) {
            // this.shoppingListService.deleteIngredient(this.igredientIndex);
            this.store.dispatch(new shoppingListActions.DeleteIngredient());
            this.onClearForm();
        }
    }
}
