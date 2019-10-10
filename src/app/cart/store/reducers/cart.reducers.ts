import { Action, ActionReducer } from '@ngrx/store';
import { AppStates } from '../../../products/store/states/app.states';
import {
  ADD_TO_CART, ADD_TO_CART_SUCCESS,
  SAVE_CURRENT_ORDER_IN_STORE, GET_CURRENT_ORDER_FROM_STORE,
  GET_CURRENT_ORDER_FROM_STORE_SUCCESS, CHECK_OUT, CHECK_OUT_SUCCESS, REMOVE_FROM_CART
} from '../actions/cart.actions';
import { Order } from '../../models/cart.model';
import { INITIAL_STORE_DATA } from '../../../products/store/states/app.states';

export class ReducerClass implements Action {
  type: string;
  payload?: any;
}

const addProductToCart = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { productsInCart: action.payload} );
  return newData;
}
const addProductToCartSuccess = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { productToCartSuccess: action.payload} );
  return newData;
}
const removeProductFromCart = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { removeProductFromCart: action.payload} );
  return newData;
};
const storeCurrentOrderInCart = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { currentOrderInCart: action.payload} );
  return newData;
};
//TODO: finilize readCurrentOrderFromStore & readCurrentOrderFromStoreSuccess:
const readCurrentOrderFromStore =  (state: AppStates, action: ReducerClass): AppStates => {
  return state;
};
const readCurrentOrderFromStoreSuccess = (state: AppStates, action: ReducerClass): AppStates => {
  return state;
};
// make payment
const checkOut = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { checkOutDetails: action.payload} );
  return newData;
};
const checkOutSuccess = (state: AppStates, action: ReducerClass): AppStates => {
  // const newData: AppStates = Object.assign({}, state, { checkOutConfirmationStatus: action.payload} );
  const newData: AppStates = Object.assign({}, state, {
    checkOutConfirmationStatus: false,
    shoppingOrderNumber: undefined,
    productsInCart: undefined,
    productToCartSuccess: undefined,
    currentOrderInCart: undefined,
    checkOutDetails: undefined
  } );
  return newData;
};


export function cartReducer (state: AppStates, action: ReducerClass) {
  switch (action.type) {
    case ADD_TO_CART:
      return addProductToCart(state, action);
    case REMOVE_FROM_CART:
      return removeProductFromCart(state, action);
    case ADD_TO_CART_SUCCESS:
      return addProductToCartSuccess(state, action);
    case SAVE_CURRENT_ORDER_IN_STORE:
      return storeCurrentOrderInCart(state, action);
    case GET_CURRENT_ORDER_FROM_STORE:
      return readCurrentOrderFromStore(state, action);
    case GET_CURRENT_ORDER_FROM_STORE_SUCCESS:
      return readCurrentOrderFromStoreSuccess(state, action);
    case CHECK_OUT:
      return checkOut(state, action);
    case CHECK_OUT_SUCCESS:
      return checkOutSuccess(state, action);
    default:
      return state;
  }
}
