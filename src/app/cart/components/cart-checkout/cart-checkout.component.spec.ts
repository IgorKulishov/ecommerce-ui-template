import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, DebugElement, Component} from '@angular/core';
import { CartCheckoutComponent } from './cart-checkout.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {Store} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, Routes} from '@angular/router';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import {CartState} from '../../store/states/cart.states';
import {SessionService} from '../../../core/services/session.service';
import {CartService} from '../../../core/services/cart.service';
import {cartReducerStateMock, StoreMock} from '../../../../test/mock';

export class CartServiceMock {
  getMethodsOfPayment() {
    return of({});
  }
}
describe('CartCheckoutComponent', () => {
  let component: CartCheckoutComponent;
  let fixture: ComponentFixture<CartCheckoutComponent>;
  let store: MockStore<CartState>;
  let router: Router;
  const routes: Routes = [
    {path: '', redirectTo: 'checkout', pathMatch: 'full'},
    {path: 'checkout', component: CartCheckoutComponent}
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ CartCheckoutComponent ],
      providers: [
        provideMockStore({ initialState: cartReducerStateMock }),
        SessionService,
        CartService,
        {provide: CartService, useClass: CartServiceMock },
        BsModalService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(CartCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
