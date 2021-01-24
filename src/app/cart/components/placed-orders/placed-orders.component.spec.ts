import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, DebugElement, Component} from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { PlacedOrdersComponent } from './placed-orders.component';
import { StoreMock, cartReducerStateMock, TranslateLoaderMock } from '../../../../test/mock';
import { Store } from '@ngrx/store';
import { AppStates } from '../../store/states/cart.states';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartService } from '../../../core/services/cart.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const cartReducerState = cartReducerStateMock;
import { By } from '@angular/platform-browser';
import {Routes, Router} from '@angular/router';


@Component({
  template: `<router-outlet></router-outlet>`
})
export class AppComponent { }
describe('PlacedOrdersComponent', () => {

  const routes: Routes = [
    {path: '', redirectTo: 'placed-orders', pathMatch: 'full'},
    {path: 'placed-orders', component: PlacedOrdersComponent}
  ];
  let component: PlacedOrdersComponent;
  let appComponent: AppComponent;
  let fixture: ComponentFixture<PlacedOrdersComponent>;
  let appFixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppStates>;
  let router: Router;
  let location: Location;
  let translate: TranslateService;
  beforeEach(async(() => {
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
        PlacedOrdersComponent,
        ModalDirective,
        AppComponent
      ],
      providers: [
        { provide: Store, useClass: StoreMock },
        BsModalService,
        CartService,
        provideMockStore({ initialState: cartReducerState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(PlacedOrdersComponent, {
      set: {
        template: `<app-alert [size]="'lg'" [dismissible]="true" [type]="'warning'"></app-alert>
<div class="container-fluid default-page-background">
  <div class="table-block">
    <table class="table text-center">
      <thead>
        <tr>
          <th id="image">{{ 'checkout.image' | translate }}</th>
          <th id="product">{{ 'checkout.product' | translate}}</th>
          <th id="price">{{ 'checkout.price' | translate}}</th>
          <th id="quantity">{{ 'checkout.quantity' | translate}}</th>
          <th id="total">{{ 'checkout.total' | translate}}</th>
          <th id="dateOfOrder">{{ 'placedOrder.dateOfOrder' | translate }}</th>
          <th id="cancel">{{ 'placedOrder.cancel' | translate }}</th>
        </tr>
      </thead>
      <!-- fullscreen view -->
      <tbody *ngFor='let placedOrdersDetails of (placedOrdersDetails$ | async)' id="order-block-for-desktop">
        <tr *ngFor='let placedOrderProductsDescription of placedOrdersDetails?.orderDetails.itemList'>
          <td class="align-middle"><img [src]="getProductUrl(placedOrderProductsDescription.product.productInfo)"
            onerror="this.onerror=null;this.src='/assets/images/teapod.jpeg';" alt="image of {{placedOrderProductsDescription.product.name}}"></td>
          <td class="align-middle">{{placedOrderProductsDescription.product.description}}</td>
          <td class="align-middle">$ {{placedOrderProductsDescription.product.price}}</td>
          <td class="align-middle">{{placedOrderProductsDescription.quantity}} {{'placedOrder.pcs' | translate}}</td>
          <td class="align-middle">$ {{ totalSum(placedOrderProductsDescription.product.price, placedOrderProductsDescription.quantity) }}</td>
          <td class="align-middle">{{placedOrdersDetails?.updatedAt | date}}</td>
          <td class="align-middle"><button type="button" class="btn btn-danger" (click)="openModal(orderCancel)">{{ 'placedOrder.cancel' | translate }}</button>
          </td>
          <!-- Modal window to approve Order cancel -->
          <ng-template #orderCancel>
            <div class="modal-body">
              <div class="text-center modal-body-text">{{'cancelOrderModal.modalBodyText' | translate}}</div><br>
              <div class="text-right">
                <button type="button" class="btn btn-success" aria-label="Close" (click)="modalRef.hide()">
                  <span aria-hidden="true">{{'cancelOrderModal.close' | translate}}</span>
                </button>
                <button type="button" class="btn btn-danger" (click)="deleteOrderFromHistory(placedOrdersDetails?.id)">{{'cancelOrderModal.cancelOrder' | translate}}</button>
              </div>
            </div>
          </ng-template>
          <!-- modal window -->
        </tr>
      </tbody>
      <!-- mobile view -->
      <tbody *ngFor='let placedOrdersDetails of (placedOrdersDetails$ | async); let i = index' id="order-block-for-mobile">
        <accordion [isAnimated]="true">
          <accordion-group>
            <button id="modalBtn" class="btn btn-link" accordion-heading type="button" (click)='changeChevronDirection(i)'>
              <div class="row">
                <div class="col-10 text-left">
                  {{placedOrdersDetails?.updatedAt | date}}
                </div>
                <div class="col-2 text-right">
                  <img [ngClass]="{'expanded-block': accordionPosition && accordionPosition[i], 'close-block': (accordionPosition && !accordionPosition[i])}" src="../../../../assets/svg/arrow-rounded-right-6x9.svg" alt="Right caret">
                </div>
              </div>
            </button>
            <tr *ngFor='let placedOrderProductsDescription of placedOrdersDetails?.orderDetails.itemList'>
              <td class="align-middle"><img [src]="getProductUrl(placedOrderProductsDescription.product.productInfo)"
                onerror="this.onerror=null;this.src='/assets/images/teapod.jpeg';" alt="image of {{placedOrderProductsDescription.product.name}}"></td>
              <td class="align-middle" [attr.data-label]="'checkout.product' | translate">{{placedOrderProductsDescription.product.description}}</td>
              <td class="align-middle" [attr.data-label]="'checkout.price' | translate">$ {{placedOrderProductsDescription.product.price}}</td>
              <td class="align-middle" [attr.data-label]="'checkout.quantity' | translate">{{placedOrderProductsDescription.quantity}} {{'placedOrder.pcs' | translate}}</td>
              <td class="align-middle" [attr.data-label]="'checkout.total' | translate">$ {{ totalSum(placedOrderProductsDescription.product.price, placedOrderProductsDescription.quantity) }}</td>
              <td class="align-middle" [attr.data-label]="'placedOrder.dateOfOrder' | translate">{{placedOrdersDetails?.updatedAt | date}}</td>
              <td class="align-middle" [attr.data-label]="'placedOrder.cancel' | translate"><button type="button" class="btn btn-danger" (click)="openModal(orderCancel)">{{ 'placedOrder.cancel' | translate }}</button></td>
              <!-- Modal window to approve Order cancel -->
              <ng-template #orderCancel>
                <div class="modal-body">
                  <div class="text-center modal-body-text">{{'cancelOrderModal.modalBodyText' | translate}}</div><br>
                  <div class="text-right">
                    <button type="button" class="btn btn-success" aria-label="Close" (click)="modalRef.hide()">
                      <span aria-hidden="true">{{'cancelOrderModal.close' | translate}}</span>
                    </button>
                    <button type="button" class="btn btn-danger" (click)="deleteOrderFromHistory(placedOrdersDetails?.id)">{{'cancelOrderModal.cancelOrder' | translate}}</button>
                  </div>
                </div>
              </ng-template>
              <!-- modal window -->
            </tr>
          </accordion-group>
        </accordion>
      </tbody>
    </table>
  </div>
  <div class="row justify-content-end pt-5">
    <div class="col-12 col-md-7 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">{{ 'checkout.cartTotals' | translate }}</h3>
          <table class="cart__totals">
            <thead *ngIf="totalAmount" class="cart__totals-header">
            <tr>
              <th>{{ 'checkout.subtotal' | translate }}</th>
              <td>$ {{totalAmount}}</td>
            </tr>
            </thead>
            <tbody *ngIf="totalAmount" class="cart__totals-body">
            </tbody>
            <tfoot class="cart__totals-footer">
            <tr>
              <th>{{ 'checkout.total' | translate }}</th>
              <td>$ {{totalAmount}}</td>
            </tr>
            <tr>
              <th>
              </th>
              <th>
                <div class="text-center checkout-confirmation" *ngIf='checkOutConfirmationStatus'>Thank you! Your order has been accepted!</div>
              </th>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
`
      }
    }).compileComponents();
  }));
  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
    translate = TestBed.get(TranslateService);
    translate.use('en');
    fixture = TestBed.createComponent(PlacedOrdersComponent);
    appFixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appComponent = appFixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should change chevron index # 1 to open position if it was closed', async(() => {
    fixture.detectChanges();
    component.changeChevronDirection(1);
    expect(component.accordionPosition[1]).toBe(true);
  }));

  it('should change chevron index # 1 to close position if it was open', async(() => {
    fixture.detectChanges();
    component.changeChevronDirection(1);
    component.changeChevronDirection(1);
    expect(component.accordionPosition[1]).toBe(false);
  }));

  it('getProductUrl should return image url if product has imageUrl prop', async(() => {
    const param = {
      id: 1,
      imageList: [{
        description: null,
        id: 2,
        imageUrl: 'https://test-image1.jpg',
        largeUrl: null,
        productInfoId: 56,
        publicId: 's4l1dp26u0cllhvmafm6'
      }]
    };
    expect(component.getProductUrl(param)).toEqual('https://test-image1.jpg');
  }));

  it('getProductUrl should return default image url if product does not have imageUrl prop', async(() => {
      const param = {
        id: 1,
        imageList: [{
          description: null,
          id: 2,
          imageUrl: null,
          largeUrl: null,
          productInfoId: 56,
          publicId: 's4l1dp26u0cllhvmafm6'
        }]
      };
      expect(component.getProductUrl(param)).toEqual('/assets/images/teapod.jpeg');
    }));
    // Routing testing
    it('should navigate to "/placed-orders"" component', fakeAsync(() => {
        router.initialNavigation();
        tick();
        router.navigate(['/placed-orders']).then(() => {
          const path = location.path();
          expect(path).toBe('/placed-orders');
        });
    }));
    // Template testing
    it('should render Image column name in En', () => {
      translate.use('en');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('#image')).nativeElement;
      expect(element.innerHTML).toEqual('Image');
    });
    it('should render Image column name in Ru', () => {
      translate.use('ru');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('#image')).nativeElement;
      expect(element.innerHTML).toEqual('Фото');
    });
    it('should render Image column name in Fr', () => {
      translate.use('fr');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('#image')).nativeElement;
      expect(element.innerHTML).toEqual('Image');
    });

    //Product column translate
    it('should render Product column name in Fr', () => {
      translate.use('fr');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('#product')).nativeElement;
      expect(element.innerHTML).toEqual('Produit');
    });

    it('should render Product column name in Ru', () => {
      translate.use('ru');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('#product')).nativeElement;
      expect(element.innerHTML).toEqual('Продукт');
    });

    it('should render Product column name in En', () => {
      translate.use('en');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('#product')).nativeElement;
      expect(element.innerHTML).toEqual('Product');
    });
});
