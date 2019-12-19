import {empty, of} from 'rxjs';

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
export class StoreMock {
  select(options) {
    return empty();
  }
  dispatch(options) {
  }
}
