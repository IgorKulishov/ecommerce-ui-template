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

export const selectCurrentOrderInCart = createFeatureSelector<CurrentOrderInCart>('cart');
export const selectItemListDetails = createSelector(
  selectCurrentOrderInCart,
  (state: CurrentOrderInCart) => {
    if (state && state.itemList) {
      return state.itemList;
  }
}
)