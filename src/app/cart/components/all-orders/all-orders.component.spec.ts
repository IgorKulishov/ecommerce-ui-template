import { DatePipe } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { cartReducerStateMock } from "../../../../test/mock";
import { OrdersHistoryApiService } from "../../service/orders-history-api.service";
import { CartState } from "../../store/states/cart.states";

import { AllOrdersComponent } from "./all-orders.component";

@Component({
  selector: "all-orders-filter",
})
class AllOrdersFilterComponent {
  @Input() orderDates = [];
  @Output() selectDate = new EventEmitter<string>();

  constructor() {}

  onSelectDate(date: string) {
    this.selectDate.emit(date);
  }
}
describe("AllOrdersComponent", () => {
  let component: AllOrdersComponent;
  let service: OrdersHistoryApiService;
  let fixture: ComponentFixture<AllOrdersComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AllOrdersComponent, AllOrdersFilterComponent],
      providers: [
        provideMockStore({ initialState: cartReducerStateMock }),
        DatePipe,
        OrdersHistoryApiService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersComponent);
    service = TestBed.inject(OrdersHistoryApiService);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call service on init", () => {
    const orders = ["order1", "order2", "order3", "order4"];
    const serviceSpy = spyOn(
      service,
      "fetchOrdersDatesForCurrentMonth"
    ).and.callFake(() => {
      return of(orders);
    });
    fixture.detectChanges();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it("should dispatch on init", () => {
    const dispatchSpy = spyOn(store, "dispatch");
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("should call fetchOrderDetailsByDate by click", () => {
    const serviceSpy = spyOn(service, "fetchOrderDetailsByDate");
    component.onSelectDate("2021-09");
    expect(serviceSpy).toHaveBeenCalledOnceWith("2021-09");
  });
});
