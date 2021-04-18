import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'all-orders-content',
  templateUrl: './all-orders-content.component.html',
  styleUrls: ['./all-orders-content.component.scss']
})
export class AllOrdersContentComponent implements OnInit {
  @Input() allOrdersDetails
  accordionPosition: { [index: number]: boolean } = [];
  constructor() { }

  ngOnInit(): void {
  }


  changeChevronDirection(index) {
    if (this.accordionPosition && this.accordionPosition[index]) {
      this.accordionPosition[index] = !this.accordionPosition[index];
    } else {
      this.accordionPosition[index] = true;
    }
  }

}
