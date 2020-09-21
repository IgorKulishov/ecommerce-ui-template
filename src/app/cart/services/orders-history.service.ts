import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AppCookieService } from '../../core/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersHistoryService {

  constructor(
    private appCookieService: AppCookieService,
    private http: HttpClient
  ) { }

  getPlacedOrderHistory(): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    const orderNumber = this.appCookieService.getOrderNumberFromCookie();
    const userId = this.appCookieService.getUserIdFromCookie();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.get(
        environment.AWS_API + `/dev/orders`,
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
