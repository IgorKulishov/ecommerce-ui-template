import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStates } from '../../../app.states';
import { LogOut } from '../../store/actions/login.actions';
import { SessionService } from '../../../core/services/session.service';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private sessionService: SessionService,
              private store: Store<AppStates>) {
  }

  async ngOnInit() {
    this.store.dispatch(new LogOut());
    await this.navigateToLogin();
  }
  async navigateToLogin() {
    await this.router.navigate(['/login']);
  }

}
