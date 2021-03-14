import { selectOrdersHistory } from './cart.selectors';
import { CartState } from '../states/cart.states'
import { cold } from 'jasmine-marbles';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { cartReducerStateMock } from '../../../../test/mock';

describe('Cart selector', () => {
  const initialState = cartReducerStateMock.cart;
  const initialPacedOrderHistoryState = initialState.orderStoredInHistoryApi;
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
      const result = selectOrdersHistory.projector(initialState);
      expect(result.length).toEqual(1);
      expect(result[0].id).toBeDefined();
      expect(result).toEqual(initialPacedOrderHistoryState);
    });
  });
});
