import { Action } from '@ngrx/store';
import { CartState } from '../states/cart.states';
import {
  ADD_TO_CART, ADD_TO_CART_SUCCESS,
  SAVE_CURRENT_ORDER_IN_STORE, GET_CURRENT_ORDER_FROM_STORE, SAVE_PLACED_ORDER,
  GET_CURRENT_ORDER_FROM_STORE_SUCCESS, CHECK_OUT, CHECK_OUT_SUCCESS, REMOVE_FROM_CART,
  STORE_PROCESSED_ORDER_IN_HISTORY_API_SUCCESS,STORE_ALL_ORDERS_API_SUCCESS
} from '../actions/cart.actions';

export class ReducerClass implements Action {
  type: string;
  payload?: any;
}

const addProductToCart = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { productsInCart: action.payload} );
  return newData;
}
const addProductToCartSuccess = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { productToCartSuccess: action.payload} );
  return newData;
}
const removeProductFromCart = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { removeProductFromCart: action.payload} );
  return newData;
};
const storeCurrentOrderInCart = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { currentOrderInCart: action.payload} );
  return newData;
};
//TODO: finilize readCurrentOrderFromStore & readCurrentOrderFromStoreSuccess:
const readCurrentOrderFromStore =  (state: CartState, action: ReducerClass): CartState => {
  return state;
};
const readCurrentOrderFromStoreSuccess = (state: CartState, action: ReducerClass): CartState => {
  return state;
};
// make payment
const checkOut = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { checkOutDetails: action.payload} );
  return newData;
};
const savePlacedOrder = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { processedOrders: action.payload} );
  return newData;
};
const savePlacedOrderDetails = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { processedOrdersDetails: action.payload} );
  return newData;
};
// There is no actual use of the (same) order details processed also saved in history lambda API
const storeProcessedOrderInHistoryApi = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { orderStoredInHistoryApi: action.payload} );
  return newData;
};
const storeAllOrderApiSuccess = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, { allOrders: action.payload} );
  return newData;
};
const checkOutSuccess = (state: CartState, action: ReducerClass): CartState => {
  const newData: CartState = Object.assign({}, state, {
    checkOutConfirmationStatus: false,
    shoppingOrderNumber: undefined,
    productsInCart: undefined,
    productToCartSuccess: undefined,
    currentOrderInCart: undefined,
    checkOutDetails: undefined
  } );
  return newData;
};


export function cartReducer (state: CartState, action: ReducerClass) {
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
    case SAVE_PLACED_ORDER:
      return savePlacedOrder(state, action);
    case CHECK_OUT:
      return checkOut(state, action);
    case CHECK_OUT_SUCCESS:
      return checkOutSuccess(state, action);
    case STORE_PROCESSED_ORDER_IN_HISTORY_API_SUCCESS:
      return storeProcessedOrderInHistoryApi(state, action);
    case STORE_ALL_ORDERS_API_SUCCESS:
      return storeAllOrderApiSuccess(state, action);
    default:
      return state;
  }
}
// STORE_PROCESSED_ORDER_IN_HISTORY_API_SUCCESS
// STORE_ALL_ORDERS_API_SUCCESS
