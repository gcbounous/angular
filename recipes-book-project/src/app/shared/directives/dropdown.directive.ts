import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    constructor(private elRef: ElementRef) { }

    // basic functionnality
    // @HostListener('click') toggleDropdown() {
    //  this.isOpen = !this.isOpen;
    // }

    @HostListener('document:click', ['$event']) toggleDropdown(event: Event): void {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

}
