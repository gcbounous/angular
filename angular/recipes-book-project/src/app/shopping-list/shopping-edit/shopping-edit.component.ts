import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('shoppingForm', {static: true}) shoppingForm: NgForm;

    editMode = false;
    igredientIndex: number;
    editSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.editSubscription = this.shoppingListService.editingIngredient.subscribe(
            (index: number) => {
                this.igredientIndex = index;

                const ingredient: Ingredient = this.shoppingListService.getIngredient(index);
                this.shoppingForm.form.setValue({name: ingredient.name, amount: ingredient.amount});
                this.editMode = true;
            }
        );
    }

    ngOnDestroy(): void {
        this.editSubscription.unsubscribe();
    }

    onSubmit(): void {
        console.log(this.shoppingForm);

        const formValues = this.shoppingForm.form.value;
        if (this.editMode) {
            this.shoppingListService.editIngredient(this.igredientIndex, formValues.name, formValues.amount);
        } else {
            this.shoppingListService.addIngredient(formValues.name, formValues.amount);
        }

        this.onClearForm();
    }

    onClearForm(): void {
        this.shoppingForm.resetForm();
        this.editMode = false;
    }

    onDeleteItem(): void {
        if (this.editMode) {
            this.shoppingListService.deleteIngredient(this.igredientIndex);
            this.onClearForm();
        }
    }
}
