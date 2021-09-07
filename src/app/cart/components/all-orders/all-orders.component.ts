import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { FetchAllOrdersHistory } from "../../store/actions/cart.actions";
import { selectAllOrdersHistory } from "../../store/selectors/cart.selectors";
import { CartState } from "../../store/states/cart.states";
import { OrdersHistoryApiService } from "../../service/orders-history-api.service";

@Component({
  selector: "all-orders",
  templateUrl: "./all-orders.component.html",
  styleUrls: ["./all-orders.component.scss"],
})
export class AllOrdersComponent implements OnInit {
  allOrdersDetails$: Observable<any>;
  orderDates$: Observable<any>;
  ordersOnDate$: Observable<any>;

  constructor(
    private ordersHistory: OrdersHistoryApiService,
    private store: Store<CartState>
  ) {
    this.allOrdersDetails$ = this.store
      .select(selectAllOrdersHistory)
      .pipe(map((store) => store));
  }

  ngOnInit(): void {
    this.orderDates$ = this.ordersHistory.fetchOrdersDatesForCurrentMonth(
      "2021-08"
    );
    this.store.dispatch(new FetchAllOrdersHistory());
  }
  onSelectDate(date) {
    this.ordersOnDate$ = this.ordersHistory.fetchOrderDetailsByDate(date);
  }
}
