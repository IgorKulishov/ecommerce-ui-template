export interface CartState {
  currentOrderInCart:         any;
  orderStoredInHistoryApi:    OrderHistory[];
  productToCartSuccess:       any;
  productsInCart:             any;
  checkOutConfirmationStatus: any;
  shoppingOrderNumber:        any;
  checkOutDetails:            any;
  allOrders: any;
}

export interface OrderHistory {
  checked:    boolean;
  id:         string;
  userid:     string;
  orderDetails: OrderDetails;
  updatedAt:  number;
}

export interface OrderDetails {
  id: number;
  userId: number;
  itemList: any;
  orderNumber: string;
  orderToken: string;
  payment: string;
  paymentId: number;
  paymentPaid: string;
  paymentPlaced: null
  totalAmount: number;
  totalQuantity: number;
}
