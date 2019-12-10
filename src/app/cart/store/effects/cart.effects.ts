import {switchMap,  map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { of ,  Observable } from 'rxjs';

import { AppCookieService } from '../../../core/services/cookie.service';

import {
  ADD_TO_CART, ADD_TO_CART_SUCCESS,
  GET_CURRENT_ORDER_FROM_STORE,
  CHECK_OUT, REMOVE_FROM_CART, SAVE_PLACED_ORDER,
  GET_PROCESSED_ORDER_FROM_STORE,  AddToCart, AddToCartSuccess, StoreCurrentOrder,
  GetCurrentOrderFromStoreSuccess, CheckOutSuccess, SavePlacedOrder, StorePlacedOrderDetails
} from '../actions/cart.actions';
// TODO: need to add order models

import { CartService } from '../../../core/services/cart.service';
import { AppStates } from '../../../app.states';
import {ProductsService} from '../../../core/services/products.service';
import {EffectError} from '../../../products/store/actions/products.actions';
import {GetOrderNumber} from '../../../auth/store/actions/login.actions';

@Injectable()
export class CartEffects {
  constructor(private addToCartAction$: Actions,
              private checkoutShoppingCartAtion$: Actions,
              private saveProductsInStoreAPIAction$: Actions,
              private getOrdersFromtStoreAction$: Actions,
              private getProcessedOrdersFromtStoreAction$: Actions,
              private removeFromCartAction$: Actions,
              private savePlacedOrderActions$: Actions,
              private productService: ProductsService,
              private store: Store<AppStates>,
              private cartService: CartService,
              private cookieService: AppCookieService) {}
    // Add to cart
  @Effect() addToCart$: any = this.addToCartAction$.pipe(
      ofType(ADD_TO_CART),
      switchMap((productToCart: any) => this.cartService.addProductToShoppingCart(productToCart).pipe(
        map((data: any) => new AddToCartSuccess( data )),
        //TODO: need to replace with Error action:
        catchError(err => of(new Error('error')))
      ))
    );
  @Effect() saveProductsInStoreAPI$: any = this.saveProductsInStoreAPIAction$.pipe(
      ofType(ADD_TO_CART_SUCCESS),
      switchMap((productToCart: any) => this.cartService.productsShoppingCart().pipe(
        map((data: any) => new StoreCurrentOrder( data )),
        //TODO: need to replace with Error action:
        catchError(err => of(new Error('error')))
      ))
    );
  // Remove from cart
  @Effect() removeFromCart$: any = this.removeFromCartAction$.pipe(
    ofType(REMOVE_FROM_CART),
    switchMap((removeProductInfo: any) => this.cartService.removeProductFromShoppingCart(removeProductInfo).pipe(
      map((data: any) => new AddToCartSuccess( data )),
      catchError(err => of(new EffectError({error_message: 'remove_product_error'})))
    ))
  );
    // get order from store
   @Effect() getOrdersFromtStore$: any = this.getOrdersFromtStoreAction$.pipe(
      ofType(GET_CURRENT_ORDER_FROM_STORE),
      map((data: any) => new GetCurrentOrderFromStoreSuccess(data))
    );

   // a) make payment b) get updated order number c) update store
   @Effect() checkoutShoppingCart$: any = this.checkoutShoppingCartAtion$.pipe(
      ofType(CHECK_OUT),
      map( data => {
        this.cookieService.setPlacedOrderNumberInCookie(this.cookieService.getOrderNumberFromCookie());
        return data;
      }),
      switchMap((orderPaymentDetails: any) => this.cartService.checkoutShoppingCart(orderPaymentDetails.payload)),
      switchMap(data => [
          new SavePlacedOrder( this.cookieService.getOrderNumberFromCookie() ),
          new CheckOutSuccess( data ),
          new GetOrderNumber( this.cookieService.getUserDetails() )
        ])
    );

  // get order from store
  @Effect() getProcessedOrdersFromtStore$: any = this.getOrdersFromtStoreAction$.pipe(
    ofType(GET_PROCESSED_ORDER_FROM_STORE),
    switchMap((processedOrderToken: string) => this.cartService.productsProcessedOrderShoppingCart(processedOrderToken).pipe(
      map((data: any) => new StorePlacedOrderDetails( data )),
      catchError(err => of(new Error('error')))
    ))
  );
}
