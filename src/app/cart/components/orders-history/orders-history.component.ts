import { Component, OnInit } from '@angular/core';
import { OrdersHistoryService } from '../../services/orders-history.service';

@Component({
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.sass']
})
export class OrdersHistoryComponent implements OnInit {

  orders: any;
  constructor(
    private ordersService: OrdersHistoryService
  ) { }

  ngOnInit() {
    this.ordersService.getPlacedOrderHistory().subscribe(
      (res: any) => console.log(res)
    );
  }

}
