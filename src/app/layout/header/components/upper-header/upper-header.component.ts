import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStates } from '../../../../app.states';
import { AppCookieService } from '../../../../core/services/cookie.service';
import {transition, trigger, style, animate} from '@angular/animations';

@Component({
  selector: 'app-upper-header',
  templateUrl: './upper-header.component.html',
  styleUrls: ['./upper-header.component.scss']
})
export class UpperHeaderComponent {
  constructor() {
  }
}
