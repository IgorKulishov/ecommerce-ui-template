import { TestBed, inject } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { AppCookieService } from './cookie.service';
import { AuthguardService } from './authguard.service';
import {Routes} from '@angular/router';
import {ProductListComponent} from '../../products/components/product-list/product-list.component';
import {Store} from '@ngrx/store';
import {StoreMock} from '../../../test/mock';

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

describe('Authguard.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthguardService,
        {provide: AppCookieService, useClass: AppCookieServiceStub},
        {provide: Store, useClass: StoreMock}
      ],
      imports: [
        RouterTestingModule.withRoutes(fake_routes)
      ]
    });
  });

  it('should be created', inject([AuthguardService], (service: AuthguardService) => {
    expect(service).toBeTruthy();
  }));
});
