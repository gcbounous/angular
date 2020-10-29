import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ],
    // Used to dynamically create components (when we add components programatically)
    // entryComponents : [
    //     AlertComponent,
    // ],
})
export class SharedModule { }
