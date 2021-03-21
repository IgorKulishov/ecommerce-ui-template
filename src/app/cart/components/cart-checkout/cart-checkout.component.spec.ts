import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, DebugElement, Component} from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartCheckoutComponent } from './cart-checkout.component';
import { StoreMock, cartReducerStateMock, TranslateLoaderMock, SessionServiceMock } from '../../../../test/mock';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/states/cart.states';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartService } from '../../../core/services/cart.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {Routes, Router} from '@angular/router';
import { SessionService } from '../../../core/services/session.service';


@Component({
  template: `<router-outlet></router-outlet>`
})
export class AppComponent { }
describe('PlacedOrdersComponent', () => {
    const routes: Routes = [
        {path: '', redirectTo: 'placed-orders', pathMatch: 'full'},
        {path: 'cart-checkout', component: CartCheckoutComponent}
      ];
      let component: CartCheckoutComponent;
      let appComponent: AppComponent;
      let fixture: ComponentFixture<CartCheckoutComponent>;
      let appFixture: ComponentFixture<AppComponent>;
      let store: MockStore<CartState>;
      let router: Router;
      let location: Location;
      let translate: TranslateService;

      beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                ModalModule.forRoot(),
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                TranslateModule.forRoot({
                  loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
                }),
              ],
              declarations: [
                CartCheckoutComponent,
                AppComponent
              ],
              providers: [
                { provide: Store, useClass: StoreMock },
                CartService,
                provideMockStore({ initialState: cartReducerStateMock }),
                Router,
                BsModalService,
                {provide: SessionService, useClass: SessionServiceMock}
              ],
              schemas: [NO_ERRORS_SCHEMA]
        });

        beforeEach(() => {
            store = TestBed.get(Store);
            fixture = TestBed.createComponent(CartCheckoutComponent);
            appFixture = TestBed.createComponent(AppComponent);
            component = fixture.componentInstance;
            appComponent = appFixture.componentInstance;
        });

        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should return itemList of currentOrderInCart', () => {
            fixture.detectChanges();
            component.productsInCart$.subscribe(result => {
              expect(result).toEqual(cartReducerStateMock.cart.currentOrderInCart.itemList);
            });
          });
      }))

});
