import {empty, of, Observable} from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core'

// Translation
export const translation = require( '../assets/i18n/en.json');
export class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translation);
  }
}
export class TranslateServiceMock {
  use(lang) {
    return lang;
  }
  get() {
    return of({
      'loginProcess': ['errorNetworkMessage', 'loginLink', 'registerLink', 'loadingMessage']
    });
  }
}
// Store
export class StoreMock {
  select(options) {
    return empty();
  }
  dispatch(options) {
  }
}


