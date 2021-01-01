import { TestBed } from '@angular/core/testing';
import { OrdersHistoryApiService } from './orders-history-api.service';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrdersHistoryService', () => {
  let service: OrdersHistoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        RouterTestingModule
      ]
    });
    service = TestBed.inject(OrdersHistoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
