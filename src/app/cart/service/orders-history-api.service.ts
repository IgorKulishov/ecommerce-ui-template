import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { SessionService } from '../../core/services/session.service';
import { of, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserDetails, Role } from '../../auth/store/models/login.model';
import { loginUserDetailsMapper } from '../../auth/store/select/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrdersHistoryApiService {
  constructor(
      private http: HttpClient,
      private sessionService: SessionService,
      private store: Store
  ) {}

  saveOrder() {
    const token = this.sessionService.getTokenFromStorage();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return combineLatest([
        this.store.select(storeData => {
          if (storeData && storeData['userLoginReducer'] && storeData['userLoginReducer']['userDetails']) {
            return storeData['userLoginReducer']['userDetails'];
          }
        }),
        this.store.select(storeData => {
          if (storeData && storeData['cartReducer'] && storeData['cartReducer']['currentOrderInCart']) {
            return storeData['cartReducer']['currentOrderInCart'];
          }
        })
      ]).pipe(
            take(1),
            switchMap( ([storeDate, orderInCart]) => {
              console.log(orderInCart);
              const userRole = storeDate.login.roles.filter((role: Role) => role.roleName === 'seller').length > 0 ? 'seller' : 'buyer';
              return this.http.post(
                environment.ORDER_HISTORY_API + '/dev/orders',
                {
                  userid: storeDate.id,
                  orderid: orderInCart.orderNumber,
                  userRole: userRole,
                  orderDetails: orderInCart.itemList
                }, options
              );
            })
      );
  }
  // getOrder() {
  //
  // }
}
