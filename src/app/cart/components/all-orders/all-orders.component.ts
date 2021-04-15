import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { FetchAllOrdersHistory } from "../../store/actions/cart.actions";
import { selectAllOrdersHistory } from "../../store/selectors/cart.selectors";
import { CartState } from "../../store/states/cart.states";

@Component({
  selector: "all-orders",
  templateUrl: "./all-orders.component.html",
  styleUrls: ["./all-orders.component.scss"],
})
export class AllOrdersComponent implements OnInit {
  allOrdersDetails$: Observable<any>;
  accordionPosition: { [index: number]: boolean } = [];

  constructor(private store: Store<CartState>) {
    this.allOrdersDetails$ = this.store
      .select(selectAllOrdersHistory)
      .pipe(map((store) => store));
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllOrdersHistory());
  }

  changeChevronDirection(index) {
    if (this.accordionPosition && this.accordionPosition[index]) {
      this.accordionPosition[index] = !this.accordionPosition[index];
    } else {
      this.accordionPosition[index] = true;
    }
  }
}
