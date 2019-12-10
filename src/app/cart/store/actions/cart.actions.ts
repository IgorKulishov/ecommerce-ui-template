import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {UserDetails} from '../../../auth/store/models/login.model';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS';
export const SAVE_CURRENT_ORDER_IN_STORE = 'SAVE_CURRENT_ORDER_IN_STORE';
export const GET_CURRENT_ORDER_FROM_STORE = 'GET_CURRENT_ORDER_FROM_STORE';
export const GET_CURRENT_ORDER_FROM_STORE_SUCCESS = 'GET_CURRENT_ORDER_FROM_STORE_SUCCESS';
export const CHECK_OUT = 'CHECK_OUT';
export const GET_PROCESSED_ORDER_FROM_STORE = 'GET_PROCESSED_ORDER_FROM_STORE';
export const CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SAVE_PLACED_ORDER = 'SAVE_PLACED_ORDER';
export const SAVE_PLACED_ORDER_DETAILS = 'SAVE_PLACED_ORDER_DETAILS';

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;
  constructor(public payload: any) {}
}
export class AddToCartSuccess implements Action {
  readonly type = ADD_TO_CART_SUCCESS;
  constructor(public payload: any) {
  }
}
export class RemoveFromCart implements Action {
  readonly type = REMOVE_FROM_CART;
  constructor(public payload: any) {}
}
export class StoreCurrentOrder implements Action {
  readonly type = SAVE_CURRENT_ORDER_IN_STORE;
  constructor(public payload?: any) {
  }
}
export class GetCurrentOrderFromStore implements Action {
  readonly type = GET_CURRENT_ORDER_FROM_STORE;
  constructor(public payload?: any) {
  }
}
export class GetProcessedOrderFromStore implements Action {
  readonly type = GET_PROCESSED_ORDER_FROM_STORE;
  constructor(public payload?: any) {
  }
}
export class GetCurrentOrderFromStoreSuccess implements Action {
  readonly type = GET_CURRENT_ORDER_FROM_STORE_SUCCESS;
  constructor(public payload?: any) {
  }
}
export class CheckOut implements Action {
  readonly type = CHECK_OUT;
  constructor(public payload?: any) {
  }
}
export class CheckOutSuccess implements Action {
  readonly type = CHECK_OUT_SUCCESS;
  constructor(public payload?: any) {
  }
}
export class SavePlacedOrder implements Action {
  readonly type = SAVE_PLACED_ORDER;
  constructor(public payload: UserDetails ) {
  }
}
export class StorePlacedOrderDetails implements Action {
  readonly type = SAVE_PLACED_ORDER_DETAILS;
  constructor(public payload: any ) {
  }
}
