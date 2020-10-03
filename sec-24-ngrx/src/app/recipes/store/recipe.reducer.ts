import { Recipe } from "../../models/recipe.model";
import * as RecipesActions from "./recipe.actions";

export interface State {
    recipes: Recipe[];
};

const initialState: State = {
    recipes: [],
};

export function recipesRecucer(state = initialState, action: RecipesActions.RecipesActions ) {

    switch(action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }

        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
            }
        
        case RecipesActions.EDIT_RECIPE:
            const oldRecipe = {...state.recipes[action.payload.index]};
            const editedRecipe = {
                ...oldRecipe,
                ...action.payload.editedRecipe
            };

            const editedRecipes = [...state.recipes];
            editedRecipes[action.payload.index] = editedRecipe;
            return {
                ...state,
                recipes: editedRecipes,
            }

        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes.filter((recipe,i) => i !== action.payload)]
            }

        default:
            return state;
    }

}
