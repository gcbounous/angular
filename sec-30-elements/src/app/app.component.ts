import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';

import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  content = null;

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
      const AlertElement = createCustomElement(AlertComponent, {injector: injector});
      customElements.define('my-alert', AlertElement);
      setTimeout(() => {
          this.content = domSanitizer.bypassSecurityTrustHtml('<my-alert [message]="Hello, did it work?"></my-alert>');
      },1000);
  }
}
