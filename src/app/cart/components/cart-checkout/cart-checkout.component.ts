
import {distinct, map} from 'rxjs/operators';
import {Component, OnInit, Inject, TemplateRef, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GetCurrentOrderFromStore, CheckOut, RemoveFromCart} from '../../store/actions/cart.actions';
import { CartState } from '../../store/states/cart.states';
import { Order, CheckoutInfo, PaymentMethods, PaymentDescription } from '../../models/cart.model';
import {BehaviorSubject, Observable} from 'rxjs';
import { SessionService } from '../../../core/services/session.service';
import { CartService } from '../../../core/services/cart.service';
import { Payments } from '../../enums/payments.enum';

import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import {ItemList} from '../../models/cart.model';
import { selectItemListDetails } from '../../store/selectors/cart.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {
  methodsOfPayment: PaymentDescription[] = [
    {
      '_id': 1,
      'paymentType': 'cash on delivery'
    },
    {
      '_id': 2,
      'paymentType': 'debit'
    },
    {
      '_id': 3,
      'paymentType': 'credit'
    },
    {
      '_id': 4,
      'paymentType': 'check'
    }
  ];
  productsInCart$: Observable<any>;
  checkOutConfirmationStatus = false;
  error = false;
  private payment = {};
  totalAmount: number;
  totalQuantity: number;
  checkoutForm: FormGroup;
  deleteProduct: ItemList;
  errorModal: BsModalRef | null;
  approveModal: BsModalRef | null;
  deleteProductState: { action: string; state: string; } = { action: undefined, state: undefined };
  deleteProductSubject: BehaviorSubject<{action: string; state: string; }> = new BehaviorSubject({action: undefined, state: undefined});
  confirmationModal: BsModalRef | null;

  modalCheckoutApprove: BsModalRef | null;
  modalCheckoutConfirmation: BsModalRef;
  // selectedItemListDetails$: Observable<any>
  @ViewChild('confirmation_template', {'static': false}) confirmation_template: ModalDirective;
  @ViewChild('remove_item_confirmation_template', {'static': false}) remove_item_confirmation_template: ModalDirective;

  constructor(private store: Store<CartState>,
              private sessionService: SessionService,
              private router: Router,
              private cartService: CartService,
              private modalService: BsModalService,
              private bsModalService: BsModalService,
               @Inject(FormBuilder) fb: FormBuilder) {

    this.checkoutForm = fb.group({
      payment_method_id: [null, Validators.minLength(50)]
    });

    // app store for total amount
    this.productsInCart$ = this.store.select( selectItemListDetails )
    .pipe(
      distinct(),
      map((res: any) => {
        return res
      }
    ));
    
    // checkout confirmation status
    this.store.select( store => {
      return store['cart'];
    }).pipe(map(res => {
      if (res && res.checkOutConfirmationStatus) {
        return res.checkOutConfirmationStatus;
      }
    })).subscribe(cartInfo => {
      this.checkOutConfirmationStatus = cartInfo;
    });
  }

  ngOnInit() {
    if (this.sessionService.getTokenFromStorage() != null ) {
      this.store.dispatch(new GetCurrentOrderFromStore());
    }
    else
      this.router.navigate(['/login']);
    this.cartService.getMethodsOfPayment()
    .subscribe((res: any) => {
      if (res.payments.length > 0) {
        this.methodsOfPayment = res.payments;
      }
    },
    err => console.error(err));
  }

  submitOrder() {

    switch (this.checkoutForm.value.payment_method_id) {
      case 'cash on delivery':
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.cash});
        break;
      case 'debit':
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.debit});
        break;
      case 'credit':
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.credit});
        break;
      case 'check':
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.check});
        break;
      default:
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.cash});
    }

    this.store.dispatch(new CheckOut(this.payment));
    this.modalCheckoutConfirmation = this.modalService.show(this.confirmation_template);
  }

  openCheckoutApproveModal(template: TemplateRef<any>) {
    this.modalCheckoutApprove = this.modalService.show(template, { class: 'modal-sm' });
  }

  closeCheckoutApproveModal() {
    this.modalCheckoutApprove.hide();
  }

  closeCheckoutConfirmationModal() {
    this.modalCheckoutConfirmation.hide();
    this.closeCheckoutApproveModal()
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

  removeProductConfirmation(template: TemplateRef<any>, deleteProduct: ItemList) {
    this.deleteProduct = deleteProduct;
    this.errorModal = null;
    this.approveModal = this.bsModalService.show(template, { class: 'modal-lg' });
  }

  removeItemFromOrder() {
    this.store.dispatch(new RemoveFromCart(
      {
        id : this.deleteProduct.id
      }
    ));
    Object.assign(this.deleteProductState, { action: 'delete_product', state: 'no_errors' });
    this.deleteProductSubject.next(this.deleteProductState);
    this.approveModal.hide();
  }

}
