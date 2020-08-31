import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';
import { ReversePipe } from './reverse.pipe';
import { OderlistPipe } from './oderlist.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
    OderlistPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
