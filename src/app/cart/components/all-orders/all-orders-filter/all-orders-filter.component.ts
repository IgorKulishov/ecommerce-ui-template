import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "all-orders-filter",
  templateUrl: "./all-orders-filter.component.html",
  styleUrls: ["./all-orders-filter.component.scss"],
})
export class AllOrdersFilterComponent implements OnInit {
  @Input() orderDates = [];
  @Output() selectDate = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
  onSelectDate(date: string) {
    this.selectDate.emit(date);
  }
}
