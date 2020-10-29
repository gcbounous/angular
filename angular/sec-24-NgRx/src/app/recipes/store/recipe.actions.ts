import { Action } from "@ngrx/store";

import { Recipe } from "../../models/recipe.model";

export const SET_RECIPES    = '[Recipes] Set recipes';
export const FETCH_RECIPES  = '[Recipes] Fetch recipes data';
export const STORE_RECIPES  = '[Recipes] Store recipes data';
export const ADD_RECIPE     = '[Recipes] Add recipe';
export const EDIT_RECIPE    = '[Recipes] Edit recipe';
export const DELETE_RECIPE  = '[Recipes] Delete recipe';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) {}
}

export class FetchData implements Action {
    readonly type = FETCH_RECIPES;
}

export class StoreData implements Action {
    readonly type = STORE_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) { }
}

export class EditRecipe implements Action {
    readonly type = EDIT_RECIPE;
    payload: { index: number, editedRecipe: Recipe };

    constructor(index: number, editedRecipe: Recipe) {
        this.payload = { index: index, editedRecipe: editedRecipe };
    }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) {}
}

export type RecipesActions =
    SetRecipes
    | FetchData
    | StoreData
    | AddRecipe
    | EditRecipe
    | DeleteRecipe;