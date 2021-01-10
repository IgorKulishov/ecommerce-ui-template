import {empty, of, Observable} from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core'

// Translation
const enJson = require('../assets/i18n/en.json');
const frJson = require('../assets/i18n/fr.json');
const ruJson = require('../assets/i18n/ru.json');

export class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    if (lang === 'ru') {
      return of(ruJson);
    } else if (lang === 'fr') {
      return of(frJson);
    } else {
      return of(enJson);
    }
  }
}
export class TranslateServiceMock {
  language = 'en';
  use(lang: string) {
    this.language = lang;
    return lang;
  }
  get() {
    if (this.language === 'ru') {
      return of(ruJson);
    } else if (this.language === 'fr') {
      return of(frJson);
    } else {
      return of(enJson);
    }
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

// Mocks of Store
export const initialAppState = {
  userLoginReducer: {
    userDetails: {
      'userName': 'kuku@kuku.com',
      'password': '',
      'token': 'eyJhbGciOiJIUzI1NiJ9',
      'mobile': 123456789,
      'login': {
        'roles': [
          {
            'roleName': 'buyer',
            'description': null,
            'id': 34
          }
        ],
        'id': 33
      },
      'id': 35
    }
  }
};

export const cartReducerStateMock = {
  cartReducer: {
    orderStoredInHistoryApi: [
      {
        'checked': false,
        'id': 'fdb32730-337c-11eb-961c-11163f8d90be',
        'orderDetails': {
          'totalAmount': 13.98,
          'orderNumber': '16de0e54369c7fe88517122ec7bb5d0c',
          'orderToken': null,
          'totalQuantity': 2,
          'paymentPlaced': null,
          'paymentId': null,
          'itemList': [
            {
              'itemId': null,
              'product': {
                'isRemoved': false,
                'price': 3.99,
                'defaultMaxQuantity': 10,
                'name': 'Plastic toy',
                'description': 'plastic toy',
                'id': 55,
                'slug': 'plastic-toy',
                'productInfo': {
                  'imageList': [
                    {
                      'description': null,
                      'largeUrl': null,
                      'id': 57,
                      'publicId': 's4l1dp26u0cllhvmafm6',
                      'productInfoId': 56,
                      'imageUrl': 'https://res.cloudinary.com/webcodes-io/image/upload/v1573100620/s4l1dp26u0cllhvmafm6.jpg'
                    }
                  ],
                  'id': 56
                }
              },
              'quantity': 1,
              'orderNumber': '16de0e54369c7fe88517122ec7bb5d0c',
              'id': 2007,
              'productId': 55
            }
          ],
          'payment': null,
          'id': 2006,
          'userId': 35,
          'paymentPaid': null
        },
        'userid': '35',
        'updatedAt': 1606789749027
      }
    ]
  }
};
