import {map, filter} from 'rxjs/operators';
import {Component, OnInit, Inject, ViewChild, TemplateRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FetchOrderHistory, DeleteOrderFromHistoryApi } from '../../store/actions/cart.actions';
import { AppStates } from '../../store/states/cart.states';
import { PaymentDescription } from '../../models/cart.model';
import { SessionService } from '../../../core/services/session.service';
import { CartService } from '../../../core/services/cart.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';
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
  placedOrdersDetails$: Observable<any>;
  @ViewChild('confirmation_template', {'static': false}) confirmation_template: ModalDirective;
  @ViewChild('remove_item_confirmation_template', {'static': false}) remove_item_confirmation_template: ModalDirective;
  modalRef: BsModalRef;

  constructor(private store: Store<AppStates>,
              private sessionService: SessionService,
              private router: Router,
              private cartService: CartService,
              private modalService: BsModalService,
              private bsModalService: BsModalService,
              @Inject(FormBuilder) fb: FormBuilder) {

    // app store for total amount
    this.placedOrdersDetails$ = this.store.select( ( store: any ) => {
      return store['cartReducer'];
    }).pipe(
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

  deg: number;
  attrName: any;
  changeChevronDirection(index){
    this.attrName = document.getElementById('chevCaretDown' + index);
    this.attrName.classList.toggle("expanded-block");
    this.deg = this.attrName.classList.contains("expanded-block")? 180 : 0;
    this.attrName.style.transform = 'rotate('+this.deg+'deg)';
  }

}
