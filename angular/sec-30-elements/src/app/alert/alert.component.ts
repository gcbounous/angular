import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: '<div><h5>This is an alert!</h5><p> {{ message }} </p></div>',
  styles: [`
    div {
        border: 1px, solid, black;
        background-color: navy;
        padding: 10px;
        font-family: sans-serif;
        color: white;
    }
  `]
})
export class AlertComponent {

    @Input() message: string;

}
