import { map, filter } from 'rxjs/operators';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FetchOrderHistory, DeleteOrderFromHistoryApi } from '../../store/actions/cart.actions';
import { CartState } from '../../store/states/cart.states';
import { PaymentDescription } from '../../models/cart.model';
import { SessionService } from '../../../core/services/session.service';
import { CartService } from '../../../core/services/cart.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { selectCart } from '../../store/selectors/cart.selectors';
@Component({
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.scss']
})
export class PlacedOrdersComponent implements OnInit {
  methodsOfPayment: PaymentDescription[] = [];
  productsInCart: any;
  error = false;
  totalQuantity: number;
  checkoutForm: FormGroup;
  placedOrdersDetails$: Observable<any>;
  @ViewChild('confirmation_template', {'static': false}) confirmation_template: ModalDirective;
  @ViewChild('remove_item_confirmation_template', {'static': false}) remove_item_confirmation_template: ModalDirective;
  modalRef: BsModalRef;
  accordionPosition: {[index: number]: boolean} = [];

  constructor(private store: Store<CartState>,
              private sessionService: SessionService,
              private router: Router,
              private cartService: CartService,
              private modalService: BsModalService) {

    // app store for total amount
    this.placedOrdersDetails$ = this.store.select( selectCart ).pipe(
      filter((res: any) => res && res.orderStoredInHistoryApi),
      map((res: any) => {
        return res.orderStoredInHistoryApi;
    }));

  }

  ngOnInit() {
    this.store.dispatch(new FetchOrderHistory());
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

  deleteOrderFromHistory( orderId: string ) {
    this.store.dispatch(new DeleteOrderFromHistoryApi(orderId));
    this.modalService.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeChevronDirection(index) {
    if ( this.accordionPosition && this.accordionPosition[index] ) {
      this.accordionPosition[index] = !this.accordionPosition[index];
    } else {
      this.accordionPosition[index] = true;
    }
  }


}
