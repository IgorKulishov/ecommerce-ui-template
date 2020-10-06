import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SessionService } from '../../../core/services/session.service';
import { ProductListComponent } from './product-list.component';
import {productsReducer} from '../../store/reducers/reducers';

export const fake_routes: Routes = [
  {path: 'products', component: ProductListComponent}
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('productsReducer', productsReducer),
        RouterTestingModule.withRoutes(fake_routes),
        BsDropdownModule.forRoot()
      ],
      providers: [
        BsModalService,
         { provide: SessionService, useClass: SessionServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
