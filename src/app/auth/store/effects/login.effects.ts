import {switchMap,  map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {LOGIN_USER, GET_ORDER_NUMBER,
  FinishStorageClearence, GetOrderNumber, EffectError, LOG_OUT} from '../actions/login.actions';
import { AppStates } from '../../../app.states';
import { LoginService } from '../../../core/services/login.service';
import { CartService } from '../../../core/services/cart.service';
import { CreateOrderNumber } from '../actions/login.actions';
import { SessionService } from '../../../core/services/session.service';
import { REGISTER_USER, RegisterUserSuccess } from '../actions/login.actions';
@Injectable()
export class LoginEffects {
  constructor(private loginActions$: Actions,
              private createOrder$: Actions,
              private logOut$: Actions,
              private loginService: LoginService,
              private cartService: CartService,
              private sessionService: SessionService,
              private RegisterUserActions$: Actions,
              private store: Store<AppStates>) { }

  @Effect() Login$: Observable<any> = this.loginActions$.pipe(
      ofType(LOGIN_USER),
      switchMap((userCreds: any) =>  this.loginService.login(userCreds).pipe(
          map((loginData: any) => {
            this.sessionService.setUserContent(JSON.stringify(loginData));
            return new GetOrderNumber( loginData );
          }),
          catchError(err => of(new EffectError(err)))
        )
      )
    );
  @Effect() CreateOrder$: any = this.createOrder$.pipe(
      ofType(GET_ORDER_NUMBER),
      switchMap((userInfo: any) => this.cartService.getOrderNumber(userInfo).pipe(
          map((orderData: any) => new CreateOrderNumber( orderData )),
          catchError(err => of(new EffectError(err)))
        )
      )
    );

  @Effect() Logout$: any = this.logOut$.pipe(
      ofType(LOG_OUT),
      switchMap(() => this.sessionService.logout().pipe(
          map(() => new FinishStorageClearence()),
          catchError(err => of(new EffectError(err)))
        )
      )
    );

  @Effect() RegisterUserEffect$: any = this.RegisterUserActions$.pipe(
      ofType(REGISTER_USER),
      switchMap((registerUserInfo: any) => this.loginService.register(registerUserInfo.payload).pipe(
          map((registrtionConfirmationData: any) => new RegisterUserSuccess(registrtionConfirmationData)),
          catchError(err => of(new EffectError(err)))
        )
      )
    );
}
