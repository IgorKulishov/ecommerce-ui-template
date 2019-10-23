import { Products, ProductDetails, ProductSlug, Order, errorState } from './products/store/models/products.model';
import { UserDetails } from './auth/store/models/login.model';
import { INITIAL_PRODUCTS_DATA } from './products/store/states/products.states';
import { INITIAL_USER_DATA } from './auth/store/states/auth.states';

export interface AppStates {
  storeData: Products[];
  userDetails: UserDetails;
  uiStateProductDetails: ProductDetails;
  uiProductDetailsSlug: ProductSlug;
  order: Order;
  errorState: errorState;
}

export const INITIAL_STORE_DATA: any = {
  storeData: INITIAL_PRODUCTS_DATA,
  uiProductDetailsSlug: {
    'ProductSlug': undefined
  },
  uiStateProductDetails: {
    'name':         undefined,
    'description':  undefined,
    'slug':         undefined,
    'price':        null,
    'productInfo':  [],
    'id':           null,
  },
  order: {
    'orderNumber': undefined,
    'orderToken': null,
    'userId': null,
    'totalAmount': null,
    'paymentId': null,
    'paymentPlaced': null,
    'paymentPaid': null,
    'itemList': null,
    'payment': null,
    'id': null
  },
  'userDetails' : INITIAL_USER_DATA
};
