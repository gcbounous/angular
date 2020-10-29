import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	evenList: number[] = [];
	oddList: number[] = [];

	addNumber(num) {
		if(num%2 == 0)
			this.evenList.push(num);
		else
			this.oddList.push(num);
	}

	clearLists() {
		this.evenList = [];
		this.oddList = []
	}
}
