import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  template: '<div class="alert alert-success" role="alert"> {{ text }} </div>',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

	text = 'This is a SUCCESS'

	constructor() { }

  	ngOnInit(): void {
  	}
}
