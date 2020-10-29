import { Component } from '@angular/core';

import { Log } from './log.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	showDetails = false;
	logClicks: Log[] = [];

	toggleParagraph() {
		this.showDetails = !this.showDetails;

		let message = 'We ';
		message += this.showDetails ? 'showed ' : 'hid ';
		message += 'the secret password';

		this.logClicks.push(new Log(message))
	}
}
