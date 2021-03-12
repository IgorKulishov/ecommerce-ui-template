import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../states/cart.states'

export const selectCart = createFeatureSelector<CartState>('cart');
export const selectOrdersHistory = createSelector(
  selectCart,
  (state: CartState) => {
    return state && state.orderStoredInHistoryApi;
  }
);
