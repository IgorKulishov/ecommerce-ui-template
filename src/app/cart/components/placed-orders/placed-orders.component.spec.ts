import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { PlacedOrdersComponent } from './placed-orders.component';
import {TranslateServiceMock, StoreMock, cartReducerStateMock, TranslateLoaderMock} from '../../../../test/mock';
import { Store } from '@ngrx/store';
import { AppStates } from '../../store/states/cart.states';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartService } from '../../../core/services/cart.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
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

});
