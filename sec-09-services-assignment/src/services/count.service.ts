import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {

	toActive = new EventEmitter<number>();
	toInactive = new EventEmitter<number>();

	inactiveToActiveCount = 0;
	activeToInactiveCount = 0;

  	constructor() { }

  	changedToActive() {
  		this.toActive.emit(++this.inactiveToActiveCount);
  	}

  	changedToInactive() {
  		this.toInactive.emit(++this.activeToInactiveCount);
  	}
}
