import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

	private intervalId;
	intervalNumber: number;

	@Output() intervalEvent = new EventEmitter<number>();
	@Output() stopInterval = new EventEmitter();

	constructor() {
		this.intervalNumber = 0;
	}

	ngOnInit(): void {
	}

	startGame() {
		this.intervalId = setInterval(() => {
			this.intervalEvent.emit(++this.intervalNumber);
		}, 1000);
	}

	stopGame() {
		clearInterval(this.intervalId);
		this.intervalNumber = 0;
		this.stopInterval.emit();
	}

}
