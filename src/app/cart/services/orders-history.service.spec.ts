import { TestBed } from '@angular/core/testing';

import { OrdersHistoryService } from './orders-history.service';

describe('OrdersHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersHistoryService = TestBed.get(OrdersHistoryService);
    expect(service).toBeTruthy();
  });
});
