import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState, CurrentOrderInCart } from '../states/cart.states'

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectOrdersHistory = createSelector(
  selectCart,
  (state: CartState) => {
      if(state && state.orderStoredInHistoryApi) {
        return state && state.orderStoredInHistoryApi;
      }
  }
);
export const selectCurrentOrderInCart = createSelector(
  selectCart,
  (state: CartState) => {
    return state.currentOrderInCart;
  }
);
export const selectItemListDetails = createSelector(
  selectCurrentOrderInCart,
  (orderInCart: CurrentOrderInCart) => {
    if (orderInCart && orderInCart.itemList) {
      return orderInCart.itemList;
    }
  }
);
export const selectTotalAmountInCart = createSelector(
  selectCurrentOrderInCart,
  (orderInCart: CurrentOrderInCart) => {
    return orderInCart.totalAmount;
  }
);
