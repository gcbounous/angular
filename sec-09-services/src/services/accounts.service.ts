import { Injectable, EventEmitter } from '@angular/core';

import { Account } from '../models/account.model';
import { LoggingService } 	from './logging.service';

@Injectable({
	providedIn: 'root'
})
export class AccountsService {

	accounts: Account[] = [
        new Account('Master Account', 'active'),
        new Account('Test account', 'inactive'),
        new Account('Hidden Account', 'unknown')
    ];

    statusUpdated = new EventEmitter<string>();

	constructor(private loggingService: LoggingService) { }

	addAccount(name: string, status: string) {
		this.accounts.push(new Account(name, status));
		this.loggingService.logStatusChange(status);
	}

	updateStatus(id: number, status: string) {
		this.accounts[id].status = status;
		this.loggingService.logStatusChange(status);
	}
}
