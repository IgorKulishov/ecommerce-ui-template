import {switchMap, map, catchError, filter} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { of ,  Observable } from 'rxjs';
import { OrdersHistoryApiService } from '../../service/orders-history-api.service';
import { SessionService } from '../../../core/services/session.service';

import {
  ADD_TO_CART, ADD_TO_CART_SUCCESS,
  GET_CURRENT_ORDER_FROM_STORE,
  CHECK_OUT, REMOVE_FROM_CART, SAVE_PLACED_ORDER, DELETE_ORDER_FROM_HISTORY_API,
  FETCH_ORDERS_HISTORY, FETCH_ALL_ORDERS_HISTORY, SAVE_ORDER_IN_HISTORY_API,
  AddToCart, AddToCartSuccess, StoreCurrentOrder,
  GetCurrentOrderFromStoreSuccess, CheckOutSuccess, SavePlacedOrder,
  SaveOrderInHistoryApi, StoreProcessedOrderInHistoryApiSuccess, FetchOrderHistory, StoreAllOrdersApiSuccess,
  
} from '../actions/cart.actions';
// TODO: need to add order models

import { CartService } from '../../../core/services/cart.service';
import { CartState } from '../states/cart.states';
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
              private saveOrderInHistoryApiAction$: Actions,
              private deleteOrderInHistoryApiAction$: Actions,
              private getAllOrdersFromtStoreAction$: Actions,
              private productService: ProductsService,
              private store: Store<CartState>,
              private cartService: CartService,
              private sessionService: SessionService,
              private ordersHistoryService: OrdersHistoryApiService) {}
    // Add to cart
  @Effect() addToCart$: any = this.addToCartAction$.pipe(
      ofType(ADD_TO_CART),
      switchMap((productToCart: any) => this.cartService.addProductToShoppingCart(productToCart).pipe(
        map((data: any) => new AddToCartSuccess( data )),
        // TODO: need to replace with Error action:
        catchError(err => of(new Error('error')))
      ))
    );
  @Effect() saveProductsInStoreAPI$: any = this.saveProductsInStoreAPIAction$.pipe(
      ofType(ADD_TO_CART_SUCCESS),
      switchMap((productToCart: any) => this.cartService.productsShoppingCart().pipe(
        map((data: any) => new StoreCurrentOrder( data )),
        // TODO: need to replace with Error action:
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
        this.sessionService.setPlacedOrderNumberInStorage(this.sessionService.getOrderNumberFromStorage());
        return data;
      }),
      switchMap((orderPaymentDetails: any) => this.cartService.checkoutShoppingCart(orderPaymentDetails.payload)),
      switchMap(data => [
          new SaveOrderInHistoryApi(),
          new SavePlacedOrder( this.sessionService.getOrderNumberFromStorage() ),
          new GetOrderNumber( this.sessionService.getUserDetails() ),
          new CheckOutSuccess( data )
      ])
    );

  // get order from store
  @Effect() getSubmittedOrdersFromHistoryApi$: any = this.getOrdersFromtStoreAction$.pipe(
    ofType(FETCH_ORDERS_HISTORY),
    switchMap(() => this.ordersHistoryService.fetchOrdersHistory().pipe(
      map((data: any) => {
        return new StoreProcessedOrderInHistoryApiSuccess(data);
      }),
      catchError(err => {
        console.error(err);
        return of(new Error('error'));
      })
    ))
  );

  @Effect() getAllOrdersFromHistoryApi$: any = this.getAllOrdersFromtStoreAction$.pipe(
    ofType(FETCH_ALL_ORDERS_HISTORY),
    switchMap(() => this.ordersHistoryService.fetchAllOrdersHistory().pipe(
      map((data: any) => {
        console.log(data);
        return new StoreAllOrdersApiSuccess(data);
      }),
      catchError(err => {
        console.error(err);
        return of(new Error('error'));
      })
    ))
  );

  @Effect() saveSubmittedOrderToHistoryApi$: any = this.saveOrderInHistoryApiAction$.pipe(
    ofType(SAVE_ORDER_IN_HISTORY_API),
    switchMap(() => this.ordersHistoryService.saveOrder().pipe(
      map((data: any) => {
        return new StoreProcessedOrderInHistoryApiSuccess(data);
      }),
      catchError(err => {
        console.log(err);
        return of(new Error('error'));
      })
    ))
  );

  @Effect() deleteSubmittedOrderFromApi: any = this.deleteOrderInHistoryApiAction$.pipe(
    ofType(DELETE_ORDER_FROM_HISTORY_API),
    switchMap((deleteOrderObj: {type: string; payload: any}) => this.ordersHistoryService.deleteOrder(deleteOrderObj.payload).pipe(
      map((data: any) => {
        return new FetchOrderHistory();
      }),
      catchError(err => {
        console.log(`Was not able to delete order, error: ${err}`);
        return of( new FetchOrderHistory());
      })
    ))
  );
}
