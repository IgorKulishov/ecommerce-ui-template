import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Store } from '@ngrx/store';
import {TranslateModule, TranslateService, TranslateLoader} from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { AppCookieService } from '../../../core/services/cookie.service';
import {StoreMock, TranslateServiceMock, TranslateLoaderMock} from '../../../../test/mock';

class AppCookieServiceStub {
  public logout(): any {}
  public storeTokenInCookie(data: any): void {}
  public getTokenFromCookie(): any {}
  public storeOrderNumberInCookie(data: any): void {}
  public getOrderNumberFromCookie(): any {}
}

export const fake_routes: Routes = [
  {path: 'login', component: LoginComponent}
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AppCookieService, useClass: AppCookieServiceStub },
        {provide: Store, useClass: StoreMock},
        {provide: TranslateService, useClass: TranslateServiceMock}
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        }),
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes(fake_routes)
        ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });
});
