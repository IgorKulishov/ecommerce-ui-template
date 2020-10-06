import { Action } from '@ngrx/store';

import { UserDetails, UserCredentials } from '../models/login.model';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const LOG_OUT = 'LOG_OUT';
export const FINISH_STORAGE_CLEARENCE = 'FINISH_STORAGE_CLEARENCE';
export const ERROR_LOADING = 'ERROR_LOADING';
export const CREATE_ORDER_NUMBER = 'CREATE_ORDER_NUMBER';
export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
export const RE_LOGIN_ON_REFRESH = 'RE_LOGIN_ON_REFRESH';

export class ReloginOnRefresh implements Action {
  readonly type = RE_LOGIN_ON_REFRESH;
  constructor(public payload: UserCredentials ) {
  }
}

export class LoginAction implements Action {
  readonly type = LOGIN_USER;
  constructor(public payload: UserCredentials ) {
  }
}

export class GetOrderNumber implements Action {
  readonly type = GET_ORDER_NUMBER;
  constructor(public payload: UserDetails ) {
  }
}

export class RegisterUserAction implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: any) {}
}

export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export class FinishStorageClearence implements Action {
  readonly type = FINISH_STORAGE_CLEARENCE;
}

export class EffectError implements Action {
  readonly type = ERROR_LOADING;
  constructor(public payload: any ) {
  }
}
export class CreateOrderNumber implements Action {
  readonly type = CREATE_ORDER_NUMBER;
  constructor(public payload: any ) {
  }
}
export class SelectLanguageAction implements Action {
  readonly type = SELECT_LANGUAGE;
  constructor(public payload: any ) {
  }
}
