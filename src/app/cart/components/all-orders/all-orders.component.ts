import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { FetchAllOrdersHistory } from "../../store/actions/cart.actions";
import { selectAllOrdersHistory } from "../../store/selectors/cart.selectors";
import { CartState } from "../../store/states/cart.states";
import { OrdersHistoryApiService } from "../../service/orders-history-api.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "all-orders",
  templateUrl: "./all-orders.component.html",
  styleUrls: ["./all-orders.component.scss"],
})
export class AllOrdersComponent implements OnInit {
  allOrdersDetails$: Observable<any>;
  orderDates$: Observable<any>;
  ordersOnDate$: Observable<any>;
  currentYearMonth: any = new Date();

  constructor(
    private ordersHistory: OrdersHistoryApiService,
    private store: Store<CartState>,
    private datePipe: DatePipe
  ) {
    this.allOrdersDetails$ = this.store
      .select(selectAllOrdersHistory)
      .pipe(map((store) => store));

    this.currentYearMonth = this.datePipe.transform(
      this.currentYearMonth,
      "yyyy-MM"
    );
  }

  ngOnInit(): void {
    this.orderDates$ = this.ordersHistory.fetchOrdersDatesForCurrentMonth(
      this.currentYearMonth
    );
    this.store.dispatch(new FetchAllOrdersHistory());
  }
  onSelectDate(date) {
    this.ordersOnDate$ = this.ordersHistory.fetchOrderDetailsByDate(date);
  }
}
