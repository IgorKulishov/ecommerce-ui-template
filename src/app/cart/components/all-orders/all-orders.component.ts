import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import { FetchAllOrdersHistory } from "../../store/actions/cart.actions";
import { selectAllOrdersHistory } from "../../store/selectors/cart.selectors";
import { CartState } from "../../store/states/cart.states";

@Component({
  selector: "all-orders",
  templateUrl: "./all-orders.component.html",
  styleUrls: ["./all-orders.component.sass"],
})
export class AllOrdersComponent implements OnInit {
  constructor(private store: Store<CartState>) {
    this.store
      .select(selectAllOrdersHistory)
      .pipe(map((store) => store))
      .subscribe(console.log);
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllOrdersHistory());
  }
}
