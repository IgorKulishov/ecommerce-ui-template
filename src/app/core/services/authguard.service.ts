import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from './session.service';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';
import {catchError, map} from 'rxjs/operators';
import {EffectError} from '../../products/store/actions/products.actions';
import {GetOrderNumber, CreateOrderNumber, ReloginOnRefresh} from '../../auth/store/actions/login.actions';

@Injectable()
export class AuthguardService implements CanActivate {
  static jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private store: Store<AppStates>,
  ) { }

  canActivate(): boolean {

    let loggedIn: boolean;
    let userDetailsInStore: any;

    /*** 1. Check token in store (token is lost on page refresh) ***/
    this.store.select( states => {
      if (states && states['userLoginReducer']) {
        return states['userLoginReducer'];
      } else if (this.getUserContent()) {
        // on refresh if userContext exist
        this.reloginOnRefresh();
      }
    }).pipe(
        map(( data: any) => {
        return data['userDetails'];
      }),
        catchError(err => {
          return undefined;
        })
      )
      .subscribe((data: any) => {
        userDetailsInStore = data;
      });
    /*** End: Check if has data in store (may lose on refresh) ***/

    if (userDetailsInStore && !AuthguardService.jwtHelper.isTokenExpired(userDetailsInStore.token)) {
      loggedIn = true;
    } else if (this.sessionService.getUserDetails() && this.sessionService.getUserDetails()['token'] && !AuthguardService.jwtHelper.isTokenExpired(this.sessionService.getUserDetails()['token'])) {
      this.store.dispatch(
        new CreateOrderNumber({
          ...this.sessionService.getUserDetails(),
          mobile: undefined
        })
      );
      loggedIn = true;
    } else {
      this.router.navigate(['/logout']);
      loggedIn = false;
    }
    return loggedIn;
  }

  reloginOnRefresh() {
    this.store.dispatch(new ReloginOnRefresh(JSON.parse(this.sessionService.getUserContent())));
  }

  getUserContent() {
    return JSON.parse(this.sessionService.getUserContent());
  }

}
