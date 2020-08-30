import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header/header.component';
import { ShoppingListComponent }    from './shopping-list/shopping-list.component';
import { RecipesComponent }         from './recipes/recipes.component';
import { RecipeListComponent }      from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent }    from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent }      from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingEditComponent }    from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeEditComponent }      from './recipes/recipe-edit/recipe-edit.component';

import { DropdownDirective } from '../directives/dropdown.directive';

import { AppRoutesModule } from "./app-routing.module";
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingEditComponent,
    RecipeEditComponent,
    DropdownDirective,
    RecipeStartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
