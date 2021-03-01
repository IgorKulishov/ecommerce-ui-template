import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Store } from '@ngrx/store';
import {TranslateModule, TranslateService, TranslateLoader} from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { SessionService } from '../../../core/services/session.service';
import {StoreMock, TranslateServiceMock, TranslateLoaderMock} from '../../../../test/mock';

class SessionServiceStub {
  public logout(): any {}
  public storeTokenInSession(data: any): void {}
  public getTokenFromStorage(): any {}
  public storeOrderNumberInStorage(data: any): void {}
  public getOrderNumberFromStorage(): any {}
}

export const fake_routes: Routes = [
  {path: 'login', component: LoginComponent}
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: SessionService, useClass: SessionServiceStub },
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
