
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
});
