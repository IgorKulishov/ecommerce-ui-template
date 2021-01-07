import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule} from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SessionService } from '../../../core/services/session.service';
import { ProductListComponent } from './product-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppStates } from '../../../cart/store/states/cart.states';
import { initialAppState } from '../../../../test/mock';
import { LoginComponent } from '../../../auth/components/login/login.component';

export const fake_routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'login', component: LoginComponent}
];

 class SessionServiceStub {
  public logout(): any {}
  public storeTokenInSession(data: any): void {}
  public getTokenFromStorage(): any {}
  public storeOrderNumberInStorage(data: any): void {}
  public getOrderNumberFromStorage(): any {}
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore<AppStates>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [
        RouterTestingModule.withRoutes(fake_routes),
        BsDropdownModule.forRoot()
      ],
      providers: [
        BsModalService,
         { provide: SessionService, useClass: SessionServiceStub },
          provideMockStore({
            initialState: initialAppState
          })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ProductListComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
