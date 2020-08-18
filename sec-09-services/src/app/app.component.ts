import { Component, OnInit } from '@angular/core';

import { Account }           from '../models/account.model';
import { AccountsService }   from '../services/accounts.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    accounts: Account[];

    constructor(private accountsService: AccountsService) {}

    ngOnInit() {
        this.accounts = this.accountsService.accounts;
    }
}