import { TestBed, inject } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { SessionService } from './session.service';
import { AuthguardService } from './authguard.service';
import {Routes} from '@angular/router';
import {ProductListComponent} from '../../products/components/product-list/product-list.component';
import {Store} from '@ngrx/store';
import {StoreMock} from '../../../test/mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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

describe('AuthguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthguardService,
        {provide: SessionService, useClass: SessionServiceStub},
        {provide: Store, useClass: StoreMock}
      ],
      imports: [
        RouterTestingModule.withRoutes(fake_routes)
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  it('should be created', inject([AuthguardService], (service: AuthguardService) => {
    expect(service).toBeTruthy();
  }));
});
