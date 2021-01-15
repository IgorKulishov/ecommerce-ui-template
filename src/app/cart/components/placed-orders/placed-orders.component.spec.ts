import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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

describe('PlacedOrdersComponent', () => {

  let component: PlacedOrdersComponent;
  let fixture: ComponentFixture<PlacedOrdersComponent>;
  let store: MockStore<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
        ModalDirective
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
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(PlacedOrdersComponent);
    component = fixture.componentInstance;
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
    // Please add test here when product does not have imageUrl prop


  }));

});
