import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateServiceMock, StoreMock, initialAppState } from '../test/mock';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import {Observable} from 'rxjs';
import { By } from '@angular/platform-browser';
import {AppStates} from './cart/store/states/cart.states';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

export class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return undefined;
  }
}

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translate: TranslateService;
  let store: MockStore<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader, useClass: FakeLoader
          }
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
        provideMockStore({
          initialState: initialAppState
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AppComponent);
    translate = TestBed.inject(TranslateService);
    translate.use('en');
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'e-commerce'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('e-commerce');
  }));
});
