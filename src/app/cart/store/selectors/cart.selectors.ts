import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../states/cart.states'

export const selectFeature = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectFeature,
  (state: any) => state.cart
);
