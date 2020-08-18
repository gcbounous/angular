import { Component } from '@angular/core';

import { ServerElement, BlueprintElement, Server } from '../model/server.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements: Server[] = [
  		new ServerElement('Server','blablabla 1'),
  		new BlueprintElement('Blueprint', 'blablabla 2'),
  	];

  	onServerAdded(serverElement: ServerElement) {
    this.serverElements.push(serverElement);
  }

  onBlueprintAdded(blueprintElement: BlueprintElement) {
    this.serverElements.push(blueprintElement);
  }
}
