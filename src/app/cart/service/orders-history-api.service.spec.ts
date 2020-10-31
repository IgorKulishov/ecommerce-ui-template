import { TestBed } from '@angular/core/testing';
import { OrdersHistoryApiService } from './orders-history-api.service';

describe('OrdersHistoryService', () => {
  let service: OrdersHistoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersHistoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
