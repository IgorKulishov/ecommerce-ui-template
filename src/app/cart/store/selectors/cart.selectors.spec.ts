import { selectOrdersHistory, selectTotalAmountInCart } from './cart.selectors';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { cartReducerStateMock } from '../../../../test/mock';

describe('Cart selector', () => {
  const initialState = cartReducerStateMock.cart;
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
    });

    store = TestBed.inject(MockStore);
  });
  describe('using projector', () => {
    it('should return history state', () => {
      const initialPacedOrderHistoryState = initialState.orderStoredInHistoryApi;
      const result = selectOrdersHistory.projector(initialState);
      expect(result.length).toEqual(1);
      expect(result[0].id).toBeDefined();
      expect(result).toEqual(initialPacedOrderHistoryState);
    });
    it('should return total amount in cart', () => {
      const currentOrderInitialState = initialState.currentOrderInCart
      const expectedAmountCartState = initialState.currentOrderInCart.totalAmount;
      const result = selectTotalAmountInCart.projector(currentOrderInitialState);
      expect(result).toEqual(expectedAmountCartState);
    });
  });
});
