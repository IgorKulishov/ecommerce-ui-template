
import { Router, ActivatedRoute, Routes } from '@angular/router'

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateLoaderMock } from '../../../../../test/mock';
import { AddToCartComponent } from './add-to-cart.component';
import { productsReducer } from '../../../store/reducers/reducers';
import { ProductsService } from '../../../../core/services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


export const fake_routes: Routes = [
  {path: 'details/:slug', component: AddToCartComponent}
];

export class LoginServiceStub {
  login(data?: any): any {}
  register(data?: any): any {}
}

export class ProductsServiceStub {
    getAllProducts(): any {}
    getProductDetails(path: any) {}
    create(data?: any): any {}
}

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            AlertModule,
            StoreModule.forRoot({}),
            StoreModule.forFeature('productsReducer', productsReducer),
            RouterTestingModule.withRoutes(fake_routes),
            TranslateModule.forRoot({
              loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
            }),
            HttpClientTestingModule
        ],
        declarations: [ AddToCartComponent ],
        providers: [
          ProductsService
        ],
        schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let productsService = TestBed.get(ProductsService);

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase quantity +1', () => {
    component.quantity = 1
    component.maxQuantity = 10
    component.incrementQuantity()
    expect(component.quantity).toEqual(2)
  });

  it('should not change quantity', () => {
    component.quantity = 3
    component.maxQuantity = 0
    component.incrementQuantity()
    expect(component.quantity).toEqual(3)
  });

  it('should decrease quantity -1', () => {
    component.quantity = 3
    component.minQuantity = 1
    component.decrementQuantity()
    expect(component.quantity).toEqual(2)
  });

  it('should not change quantity', () => {
    component.quantity = 2
    component.minQuantity = 10
    component.decrementQuantity()
    expect(component.quantity).toEqual(2)
  });

  it('should show a warning message if entered number is not a number', () => {
    let numberEntered = 'abc'
    component.checkIfExceedLimit(numberEntered)
    expect(component.limitStockMessage).toEqual('Please enter a number')
  });

  it('should the quantity to equal maxQuantity if entered number >= maxQuantity', () => {
    let numberEntered = 13
    component.maxQuantity = 10
    component.checkIfExceedLimit(numberEntered)
    expect(component.quantity).toEqual(10)
  });

  it('should the quantity to equal minQuantity if entered number < minQuantity', () => {
    let numberEntered = 0
    component.minQuantity = 1
    component.checkIfExceedLimit(numberEntered)
    expect(component.quantity).toEqual(1)
  });

  it('should the quantity to equal entered number', () => {
    let numberEntered = 5
    component.minQuantity = 1
    component.maxQuantity = 10
    component.checkIfExceedLimit(numberEntered)
    expect(component.quantity).toEqual(5)
  });

  it('should call startIntervalIcrementQnty func if input param = incrementQuantity', () => {
    let changeQuantity = 'incrementQuantity'
    spyOn(component, 'startIntervalIcrementQnty')
    component.mousedown(changeQuantity)
    expect(component.startIntervalIcrementQnty).toHaveBeenCalled()
  });

  it('should call startIntervalDecrementQnty func if input param = decrementQuantity', () => {
    let changeQuantity = 'decrementQuantity'
    spyOn(component, 'startIntervalDecrementQnty')
    component.mousedown(changeQuantity)
    expect(component.startIntervalDecrementQnty).toHaveBeenCalled()
  });

  it('should call clearIntervalIcrementQnty func if input param = incrementQuantity', () => {
    let changeQuantity = 'incrementQuantity'
    spyOn(component, 'clearIntervalIcrementQnty')
    component.mouseup(changeQuantity)
    expect(component.clearIntervalIcrementQnty).toHaveBeenCalled()
  });

  it('should call clearIntervalDecrementQnty func if input param = decrementQuantity', () => {
    let changeQuantity = 'decrementQuantity'
    spyOn(component, 'clearIntervalDecrementQnty')
    component.mouseup(changeQuantity)
    expect(component.clearIntervalDecrementQnty).toHaveBeenCalled()
  });
  
  
});
