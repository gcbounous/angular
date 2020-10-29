import { Component } from '@angular/core';

import { CountService } from '../services/count.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    inactiveToActive: number = 0;
    activeToInactive: number = 0;

    constructor(private countService: CountService) {
      this.countService.toActive.subscribe((num) => { this.inactiveToActive = num; });
      this.countService.toInactive.subscribe((num) => { this.activeToInactive = num; });
    }

}
