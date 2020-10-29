import { Directive,
		ElementRef,
		Renderer2,
		OnInit,
		HostListener,
		HostBinding,
		Input
	} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
	@Input('default') defaultColor: string = 'transparent';
	@Input('appBetterHighlight') highlightColor: string = 'pink';
	@HostBinding('style.backgroundColor') backgroundColor: string;

	constructor(private elRef: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		// this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
		this.backgroundColor = this.defaultColor;
	}

	@HostListener('mouseenter') 
	mouseEnter(eventData: Event) {
		// this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
		this.backgroundColor = this.highlightColor;
	} 

	@HostListener('mouseleave') 
	mouseLeave(eventData: Event) {
		// this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
		this.backgroundColor = this.defaultColor;
	} 
}
