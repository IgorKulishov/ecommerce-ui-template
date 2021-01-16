import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, DebugElement, Component} from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
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
    }).compileComponents();
  }));
  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
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

    it('should navigate to "/placed-orders"" component', fakeAsync(() => {
      router.initialNavigation();
      tick();
      router.navigate(['/placed-orders']).then(() => {
        const path = location.path();
        expect(path).toBe('/placed-orders');
      });
  }));

});
