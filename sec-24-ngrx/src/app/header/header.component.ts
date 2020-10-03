import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean;

    private userSubscription: Subscription;

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit(): void {
        this.userSubscription = this.store.select('auth').subscribe(authState => this.isAuthenticated = !!authState.user);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
    
    onSaveData() {
        this.store.dispatch(new RecipesActions.StoreData());

    }

    onFetchData() {
        this.store.dispatch(new RecipesActions.FetchData());
        this.router.navigate(['/']);
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

}
