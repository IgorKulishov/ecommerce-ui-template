import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { cartReducerStateMock } from "../../../../test/mock";
import { CartState } from "../../store/states/cart.states";

import { AllOrdersComponent } from "./all-orders.component";

describe("AllOrdersComponent", () => {
  let component: AllOrdersComponent;
  let fixture: ComponentFixture<AllOrdersComponent>;
  let store: MockStore<CartState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllOrdersComponent],
      providers: [provideMockStore({ initialState: cartReducerStateMock })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
