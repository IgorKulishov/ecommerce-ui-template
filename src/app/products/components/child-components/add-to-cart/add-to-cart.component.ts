import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';

import { AppStates } from '../../../../app.states';

@Component({
  selector: 'add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  public show = true;
  public slug: string;
  @Input() maxQuantity : number;
  @Input() minQuantity : number;
  public quantity = 1;
  @Output() selectedQuantity : EventEmitter<number> = new EventEmitter()

  public limitStockMessage: string;
  intervalIcrementQnty: any;
  itervalDecrementQnty: any;

  constructor(
    private store: Store<AppStates>,
    private translate: TranslateService
    ) {

  }

  ngOnInit() {

  }

  incrementQuantity() {
    if(this.quantity < this.maxQuantity) {
      ++this.quantity;
      this.selectedQuantity.emit(this.quantity);
      this.limitStockMessage = '';
    } else {
      this.translate.get('product.selectMaxLimit', {value: this.maxQuantity})
        .subscribe(translation => {
          this.limitStockMessage = translation;
        });
    }
  }

  decrementQuantity() {
    if (this.quantity > this.minQuantity) {
      --this.quantity;
      this.selectedQuantity.emit(this.quantity);
      this.limitStockMessage = '';
    } else {
      this.translate.get('product.selectMinLimit', {value: this.minQuantity})
        .subscribe(translation => {
          this.limitStockMessage = translation;
        });
    }
  }

  checkIfExceedLimit(numberEntered) {
    if (isNaN(numberEntered)) {
      this.limitStockMessage = 'Please enter a number';
      this.quantity = this.minQuantity;
    } else if (numberEntered >= this.maxQuantity) {
      this.translate.get('product.selectMaxLimit', {value: this.maxQuantity})
        .subscribe(translation => {
          this.limitStockMessage = translation;
        });
      this.quantity = this.maxQuantity;
    } else if (numberEntered < this.minQuantity) {
      this.translate.get('product.selectMinLimit', {value: this.minQuantity})
        .subscribe(translation => {
          this.limitStockMessage = translation;
        });
      this.quantity = this.minQuantity;
    } else {
      this.limitStockMessage = '';
      this.quantity = numberEntered;
    }
  }
  // Auto-increment functionality:
  mousedown(changeQuantity: string) {
    if (changeQuantity === 'incrementQuantity') {
      this.startIntervalIcrementQnty();
    } else if (changeQuantity === 'decrementQuantity') {
      this.startIntervalDecrementQnty();
    }
  }
  mouseup(changeQuantity: string) {
    if(changeQuantity === 'incrementQuantity') {
      this.clearIntervalIcrementQnty();
    } else if(changeQuantity === 'decrementQuantity') {
      this.clearIntervalDecrementQnty();
    }
  }
  startIntervalIcrementQnty() {
    this.intervalIcrementQnty = setInterval(() => {
      this.incrementQuantity();
    }, 500);
  }
  startIntervalDecrementQnty() {
    this.itervalDecrementQnty = setInterval(() => {
      this.decrementQuantity();
    }, 500);
  }
  clearIntervalIcrementQnty() {
    clearInterval(this.intervalIcrementQnty);
  }
  clearIntervalDecrementQnty() {
    clearInterval(this.itervalDecrementQnty);
  }
}
