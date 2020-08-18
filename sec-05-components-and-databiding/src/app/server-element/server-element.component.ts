import { Component,
		OnInit,
		Input,
		ViewEncapsulation,
		OnChanges,
		SimpleChanges,
		AfterContentInit,
		AfterContentChecked,
		AfterViewInit,
		AfterViewChecked,
		OnDestroy,
		ContentChild, 
		ElementRef
	} from '@angular/core';

import { Server } from '../../model/server.model'

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation : ViewEncapsulation.Emulated //None, Native
})
export class ServerElementComponent implements OnInit,
		OnChanges,
		AfterContentInit,
		AfterContentChecked,
		AfterViewInit,
		AfterViewChecked,
		OnDestroy {

	// @Input('srvElement') element: Server;
	@Input('name') name: string = '';
	@ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  	constructor() { 
  		console.log('constructor called.');
  	}

	ngOnChanges(changes: SimpleChanges) {
		// is called if you change a element of this component.
  		console.log('ngOnChanges called.');
  		console.log(changes);
	}

	ngOnInit(): void {
		// is called after the constructor once the component has been initialized.
  		console.log('ngOnInit called.');
  		console.log('Text content of Paragraph:' + this.paragraph.nativeElement.textContent); // we can't see contentsince ng-content hasn't been initialized
	}

	ngOnCheck() {
		// is called on every change to check if this component is affected and what it needs to do.
		console.log('AfterContentInit is called.');	
	}

	ngAfterContentInit() {
		// is called after ng-content has been initialized.
		console.log('AfterContentInit is called.');
  		console.log('Text content of Paragraph:' + this.paragraph.nativeElement.textContent); // ng-content has been initialized so we can se content
	}

	ngAfterContentChecked() {
		// is called when checking for ng-content changes.
		console.log('AfterContentChecked is called.');
	}

	ngAfterViewInit() {
		// I don't remember
		console.log('AfterViewInit is called.');
	}

	ngAfterViewChecked() {
		// I don't remember
		console.log('AfterViewChecked is called.');
	}

	ngOnDestroy() {
		// is called before deleting element from DOM (ex: if a *ngIf is not true anymore)
		console.log('OnDestroy is called.');
	} 


}
