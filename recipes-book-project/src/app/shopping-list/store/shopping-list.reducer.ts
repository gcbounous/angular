import { Ingredient } from "../../models/ingredient.model";
import * as ShoppingListAction from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient('curcuma', 2),
        new Ingredient('tomato', 10)
    ]
};

export function ShoppingListReducer(
    state = initialState,
    action: ShoppingListAction.AddIngredientAction
) {
    switch(action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        default:
            return state;
    } 
}