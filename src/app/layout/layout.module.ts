import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/components/header.component';
import { UpperHeaderComponent } from './header/components/upper-header/upper-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../core/core.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    AlertModule,
    FormsModule,
    CoreModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    UpperHeaderComponent
  ],
  exports: [
    HeaderComponent,
    UpperHeaderComponent
  ],
  providers: [

  ]
})
export class LayoutModule { }
