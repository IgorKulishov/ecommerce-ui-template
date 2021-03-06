import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import {catchError, map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class CartService {

  constructor(private http: HttpClient,
              private sessionService: SessionService) { }

  getOrderNumber(data: any): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.post(
        environment.REST_API + '/rest/api/order/add', { 'userId': data.payload.id }, options
      ).pipe(
        map((res: Response) => {
          const respObj = res;
          this.sessionService.storeOrderNumberInStorage(respObj);
          return respObj;
        })
      );
    }
  }

  addProductToShoppingCart(data: any): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    const orderNumber = this.sessionService.getOrderNumberFromStorage();
    if (token && orderNumber) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.post(
        environment.REST_API + `/rest/api/item/add/${orderNumber}`,
        {
          'quantity' : data.payload.quantity,
          'productId': data.payload.id
        },
        options
      ).pipe(
        map((res: Response) => {
          const respObj = res;
          return respObj;
        })
      );
    }
  }
  removeProductFromShoppingCart(data: any): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    const orderNumber = this.sessionService.getOrderNumberFromStorage();
    if (token && orderNumber) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.post(
        environment.REST_API + `/rest/api/item/remove/${orderNumber}`,
        {
          'itemId': data.payload.id
        },
        options
      );
    }
  }
  productsShoppingCart(): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    const orderNumber = this.sessionService.getOrderNumberFromStorage();
    if (token && orderNumber) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.get(
        environment.REST_API + `/rest/api/order/number/${orderNumber}`,
        options
      ).pipe(
        map((res: Response) => {
          const respObj = res;
          return respObj;
        })
      );
    }
  }
  checkoutShoppingCart(paymentInfo: any) {
    // order_token is not used yet
    const order_token = null;
    const token = this.sessionService.getTokenFromStorage();
    const orderNumber = this.sessionService.getOrderNumberFromStorage();
    if (token && orderNumber) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.post(
        environment.REST_API + `/rest/api/order/number/${orderNumber}/makePayment?order_token=${order_token}`,
        {
            payment_method_id : paymentInfo.payment_method_id,
            amount: paymentInfo.amount
        },
        options
      ).pipe(
        map((res: Response) => {
          const respObj = res;
          return respObj;
        })
      );
    }

  }

  getMethodsOfPayment() {
    const token = this.sessionService.getTokenFromStorage();
    const orderNumber = this.sessionService.getOrderNumberFromStorage();

    if (token && orderNumber) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.get(
        environment.REST_API + `/rest/api/payment/all`,
        options
      ).pipe(
        map((res: Response) => {
          const respObj = res;
          return respObj;
        })
      );
    }

  }

}
