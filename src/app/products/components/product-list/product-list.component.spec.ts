import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppCookieService } from '../../../core/services/cookie.service';
import { ProductListComponent } from './product-list.component';
import {productsReducer} from '../../store/reducers/reducers';

export const fake_routes: Routes = [
  {path: 'products', component: ProductListComponent}
];

 class AppCookieServiceStub {
  public logout(): any {}
  public storeTokenInCookie(data: any): void {}
  public getTokenFromCookie(): any {}
  public storeOrderNumberInCookie(data: any): void {}
  public getOrderNumberFromCookie(): any {}
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
         { provide: AppCookieService, useClass: AppCookieServiceStub }
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
