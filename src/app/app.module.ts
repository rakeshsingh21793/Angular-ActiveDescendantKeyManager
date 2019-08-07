import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent, ListComponent, ListItemComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ListComponent, ListItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
