import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

import { ServerElement, BlueprintElement, Server } from '../../model/server.model'

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated  = new EventEmitter<ServerElement>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<ServerElement>();

  // newServerName = '';
  // newServerContent = '';

  // Get's view's element by local reference
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(name: HTMLInputElement) {
    this.serverCreated.emit(new ServerElement(name.value, this.serverContentInput.nativeElement.value));
  }

  onAddBlueprint(name: HTMLInputElement) {
    this.blueprintCreated.emit(new BlueprintElement(name.value, this.serverContentInput.nativeElement.value));
  }

}
