import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map, switchMap, take } from "rxjs/operators";
import { SessionService } from "../../core/services/session.service";
import { of, combineLatest, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { UserDetails, Role } from "../../auth/store/models/login.model";
import { loginUserDetailsMapper } from "../../auth/store/select/auth.selectors";
// TODO: move to new module for AWS microservices
@Injectable({
  providedIn: "root",
})
export class OrdersHistoryApiService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private store: Store
  ) {}
  fetchOrdersHistory(): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    const userid = this.sessionService.getUserIdFromStorage();
    if (!!token) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
      const options = {
        headers: headers,
      };
      return this.http.get(
        environment.ORDER_HISTORY_API + `/orders/userid/${userid}`,
        options
      );
    }
  }
  fetchAllOrdersHistory(): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    if (!!token) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
      const options = {
        headers: headers,
      };
      return this.http.get(environment.ORDER_HISTORY_API + `/orders`, options);
    }
  }
  fetchOrdersDatesForCurrentMonth(yearMonth: string): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    if (!!token) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
      const options = {
        headers: headers,
      };
      return this.http.get(
        environment.ORDER_HISTORY_API + `/order-date/${yearMonth}`,
        options
      );
    }
  }
  fetchOrderDetailsByDate(date: string): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    if (!!token) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
      const options = {
        headers: headers,
      };
      return this.http.get(
        environment.ORDER_HISTORY_API + `/orders?ordersDate=${date}`,
        options
      );
    }
  }
  saveOrder() {
    const token = this.sessionService.getTokenFromStorage();
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    const options = {
      headers: headers,
    };
    return combineLatest([
      this.store.select((storeData) => {
        if (
          storeData &&
          storeData["userLoginReducer"] &&
          storeData["userLoginReducer"]["userDetails"]
        ) {
          return storeData["userLoginReducer"]["userDetails"];
        }
      }),
      this.store.select((storeData) => {
        if (
          storeData &&
          storeData["cart"] &&
          storeData["cart"]["currentOrderInCart"]
        ) {
          return storeData["cart"]["currentOrderInCart"];
        }
      }),
    ]).pipe(
      take(1),
      switchMap(([storeDate, orderInCart]) => {
        console.log(orderInCart);
        const userRole =
          storeDate.login.roles.filter(
            (role: Role) => role.roleName === "seller"
          ).length > 0
            ? "seller"
            : "buyer";
        return this.http.post(
          environment.ORDER_HISTORY_API + "/orders",
          {
            userid:
              typeof storeDate.id === "string"
                ? storeDate.id
                : JSON.stringify(storeDate.id),
            orderid: orderInCart.orderNumber,
            userRole: userRole,
            orderDetails: JSON.stringify(orderInCart),
          },
          options
        );
      })
    );
  }
  deleteOrder(orderId: string): Observable<any> {
    const token = this.sessionService.getTokenFromStorage();
    if (!!token) {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
      const options = {
        headers: headers,
      };
      return this.http.post(
        environment.ORDER_HISTORY_API + `/orders/delete`,
        { order_id: orderId },
        options
      );
    }
  }
}
