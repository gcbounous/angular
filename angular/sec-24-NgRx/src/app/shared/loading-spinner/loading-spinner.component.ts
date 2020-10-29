import { Component } from '@angular/core'

@Component({
    selector: 'app-loading-spinner',
    template: '<div style="width: 100%; text-align: center;"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}