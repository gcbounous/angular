import { Ingredient } from "../../models/ingredient.model";
import * as ShoppingListAction from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('curcuma', 2),
        new Ingredient('tomato', 10)
    ],
    editedIngredient : null,
    editedIngredientIndex : -1
};

export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListAction.ShoppingListActions
) {
    switch(action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }

        case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case ShoppingListAction.UPDATE_INGREDIENT:
            const oldIngredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...oldIngredient,   // we get the whole old ingredient's properties
                ...action.payload   // we change the properties we have on the ingredient in our payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients : updatedIngredients
            }

        case ShoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients : state.ingredients.filter((ingredient, index) => index !== state.editedIngredientIndex ) // filter: return true to what you want to keep
            }

        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            }

        case ShoppingListAction.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        default:
            return state;
    } 
}