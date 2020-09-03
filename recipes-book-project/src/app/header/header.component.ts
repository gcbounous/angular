import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private dataStorage: DataStorageService,
                private router: Router) { }

    ngOnInit(): void {}
    
    onSaveData() {
        this.dataStorage.saveRecipes();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
        this.router.navigate(['/']);
    }

}
