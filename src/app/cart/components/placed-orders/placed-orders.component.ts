import {map} from 'rxjs/operators';
import {Component, OnInit, Inject, TemplateRef, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GetCurrentOrderFromStore, CheckOut, RemoveFromCart} from '../../store/actions/cart.actions';
import { AppStates } from '../../store/states/cart.states';
import { Order, CheckoutInfo, PaymentMethods, PaymentDescription } from '../../models/cart.model';

import { AppCookieService } from '../../../core/services/cookie.service';
import { CartService } from '../../../core/services/cart.service';


import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import {GetProducts} from '../../../products/store/actions/products.actions';


@Component({
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.scss']
})
export class PlacedOrdersComponent implements OnInit {
  methodsOfPayment: PaymentDescription[] = [];
  productsInCart: any;
  checkOutConfirmationStatus = false;
  error = false;
  private payment = {};
  totalAmount: number;
  totalQuantity: number;
  checkoutForm: FormGroup;
  @ViewChild('confirmation_template', {'static': false}) confirmation_template: ModalDirective;
  @ViewChild('remove_item_confirmation_template', {'static': false}) remove_item_confirmation_template: ModalDirective;

  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router,
              private cartService: CartService,
              private modalService: BsModalService,
              private bsModalService: BsModalService,
              @Inject(FormBuilder) fb: FormBuilder) {

    // app store for total amount
    this.store.select( store => {
      return store['cartReducer'];
    }).pipe(map(res => {
      if (res && res.processedOrders) {
        return res.processedOrders;
      }
    })).subscribe(cartInfo => {
      console.log(cartInfo);

      // this.store.dispatch(new GetProducts());

      // if (cartInfo && cartInfo.totalAmount && cartInfo.totalAmount) {
      //   this.totalAmount = cartInfo.totalAmount;
      //   this.totalQuantity = cartInfo.totalQuantity;
      //   this.payment = {amount: cartInfo.totalAmount}
      // }
      // if (cartInfo && cartInfo.itemList) {
      //   this.productsInCart = cartInfo.itemList;
      // }
    });
  }

  ngOnInit() {
    if (this.appCookieService.getTokenFromCookie() != null ) {
      this.store.dispatch(new GetCurrentOrderFromStore());
    } else {
      this.router.navigate(['/login']);
    }
    this.cartService.getMethodsOfPayment()
      .subscribe((res: any) => {
          if (res.payments.length > 0) {
            this.methodsOfPayment = res.payments;
          }
        },
        err => console.error(err));
  }

  totalSum(price, selectedQuantity) {
    return Math.round(price * selectedQuantity * 100) / 100;
  }

  getProductUrl(product) {
    if (product && product.imageList.length > 0) {
      const url = product.imageList[0]['imageUrl'] ? product.imageList[0]['imageUrl'] :
        product.imageList[0]['largeUrl'] ? product.imageList[0]['largeUrl'] : '/assets/images/teapod.jpeg';
      return url;
    } else if (product && product.imageList.length === 0) {
      return  '/assets/images/teapod.jpeg';
    }
  }

}
