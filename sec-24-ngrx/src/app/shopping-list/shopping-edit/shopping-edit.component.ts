import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/models/ingredient.model';
import * as shoppingListActions from "../store/shopping-list.actions";
import * as fromApp from '../../store/app.reducer';

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
        private store: Store<fromApp.AppState>
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
            this.store.dispatch(new shoppingListActions.UpdateIngredient( new Ingredient(formValues.name, formValues.amount)));
        } else {
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
            this.store.dispatch(new shoppingListActions.DeleteIngredient());
            this.onClearForm();
        }
    }
}
