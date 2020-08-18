import { Component, Input } from '@angular/core';

import { Account }           from '../../models/account.model';
import { AccountsService }   from '../../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: Account;
  @Input() id: number;

  constructor(private accountsService: AccountsService) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    this.accountsService.statusUpdated.emit(status);
  }
}
