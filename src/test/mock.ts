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
  cart: {
    currentOrderInCart: {
      "orderNumber": "c7fc090507095ac35e251a5973ec916b",
      "orderToken": null,
      "userId": 1211,
      "totalAmount": 123.97,
      "totalQuantity": 4,
      "paymentId": null,
      "paymentPlaced": null,
      "paymentPaid": null,
      "itemList": [
        {
          "itemId": null,
          "productId": 40,
          "quantity": 1,
          "orderNumber": "c7fc090507095ac35e251a5973ec916b",
          "product": {
            "name": "toy",
            "description": "mechanic toy",
            "slug": "mechanic-toy",
            "price": 9.99,
            "defaultMaxQuantity": 10,
            "isRemoved": false,
            "productInfo": {
              "imageList": [
                {
                  "largeUrl": null,
                  "imageUrl": "https://res.cloudinary.com/webcodes-io/image/upload/v1573100286/cgncnogdofepfd1jc9oy.jpg",
                  "publicId": "cgncnogdofepfd1jc9oy",
                  "description": null,
                  "productInfoId": 41,
                  "id": 50
                }
              ],
              "id": 41
            },
            "id": 40
          },
          "id": 2305
        },
        {
          "itemId": null,
          "productId": 42,
          "quantity": 1,
          "orderNumber": "c7fc090507095ac35e251a5973ec916b",
          "product": {
            "name": "robot",
            "description": "robot1",
            "slug": "robot1",
            "price": 100,
            "defaultMaxQuantity": 10,
            "isRemoved": false,
            "productInfo": {
              "imageList": [
                {
                  "largeUrl": null,
                  "imageUrl": "https://res.cloudinary.com/webcodes-io/image/upload/v1573100113/m6xqpddpalxl2zubmajx.png",
                  "publicId": "m6xqpddpalxl2zubmajx",
                  "description": null,
                  "productInfoId": 43,
                  "id": 44
                }
              ],
              "id": 43
            },
            "id": 42
          },
          "id": 2306
        },
        {
          "itemId": null,
          "productId": 55,
          "quantity": 1,
          "orderNumber": "c7fc090507095ac35e251a5973ec916b",
          "product": {
            "name": "Plastic toy",
            "description": "plastic toy",
            "slug": "plastic-toy",
            "price": 3.99,
            "defaultMaxQuantity": 10,
            "isRemoved": false,
            "productInfo": {
              "imageList": [
                {
                  "largeUrl": null,
                  "imageUrl": "https://res.cloudinary.com/webcodes-io/image/upload/v1573100620/s4l1dp26u0cllhvmafm6.jpg",
                  "publicId": "s4l1dp26u0cllhvmafm6",
                  "description": null,
                  "productInfoId": 56,
                  "id": 57
                }
              ],
              "id": 56
            },
            "id": 55
          },
          "id": 2307
        },
        {
          "itemId": null,
          "productId": 40,
          "quantity": 1,
          "orderNumber": "c7fc090507095ac35e251a5973ec916b",
          "product": {
            "name": "toy",
            "description": "mechanic toy",
            "slug": "mechanic-toy",
            "price": 9.99,
            "defaultMaxQuantity": 10,
            "isRemoved": false,
            "productInfo": {
              "imageList": [
                {
                  "largeUrl": null,
                  "imageUrl": "https://res.cloudinary.com/webcodes-io/image/upload/v1573100286/cgncnogdofepfd1jc9oy.jpg",
                  "publicId": "cgncnogdofepfd1jc9oy",
                  "description": null,
                  "productInfoId": 41,
                  "id": 50
                }
              ],
              "id": 41
            },
            "id": 40
          },
          "id": 2308
        }
      ],
      "payment": null,
      "id": 2304
    },
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
