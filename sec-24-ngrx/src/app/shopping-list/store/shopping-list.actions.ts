import { Action } from "@ngrx/store";

import { Ingredient } from "../../models/ingredient.model";

export const ADD_INGREDIENT     = '[Shopping List] Add ingredient';
export const ADD_INGREDIENTS    = '[Shopping List] Add ingredients';
export const UPDATE_INGREDIENT  = '[Shopping List] Update ingredient';
export const DELETE_INGREDIENT  = '[Shopping List] Delete ingredient';
export const START_EDIT         = '[Shopping List] Start edit';
export const STOP_EDIT          = '[Shopping List] Stop edit';

export type ShoppingListActions = 
AddIngredient
| AddIngredients
| UpdateIngredient
| DeleteIngredient
| StartEdit
| StopEdit;

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;

    constructor() {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    public payload;

    constructor(index: number) {
        this.payload = index;
    }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}
