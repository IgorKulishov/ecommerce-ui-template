import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';

import { CartService } from '../../services/cart.service';
// import { Product } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { QuickviewService } from '../../services/quickview.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';
import {filter, map, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AddToCart} from '../../../cart/store/actions/cart.actions';
import { AppStates } from '../../../app.states';
import {ProductDetails, Products} from '../../../products/store/models/products.model';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {RemoveItemFromProductList} from '../../../products/store/actions/products.actions';
import {UserDetails} from '../../../auth/store/models/login.model';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    deleteProductSubject: BehaviorSubject<{action: string; state: string; }> = new BehaviorSubject({action: undefined, state: undefined});
    deleteProductState: {action: string; state: string; } = {action: undefined, state: undefined};
    confirmationModal: BsModalRef | null;
    @ViewChild('error_modal', {'static': false}) error_modal: ModalDirective;
    @ViewChild('remove_item_confirmation_template', {'static': false}) confirmation_template: ModalDirective;

    @Input() productId: string;
    @Input() selectedQuantity: number;
    @Input() product: any;
    @Input() layout: 'grid-sm'|'grid-nl'|'grid-lg'|'list'|'horizontal'|null = null;

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    showingQuickview = false;
    userDetails$: Observable<UserDetails>;

    approveModal: BsModalRef | null;
    deleteProduct: ProductDetails;
    errorModal: BsModalRef | null;

    constructor(
        private store: Store<AppStates>,
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartService,
        public wishlist: WishlistService,
        public compare: CompareService,
        public quickview: QuickviewService,
        public currency: CurrencyService,
        private modalService: BsModalService
    ) {
      this.userDetails$ = this.store.select(
        res => {
          if (res && res['userLoginReducer'] && res['userLoginReducer']['userDetails']) {
            return res['userLoginReducer']['userDetails'];
          }
        })
        .pipe(
          map((userDetails: UserDetails) => {
            return userDetails;
          })
        );
    }

    ngOnInit(): void {
        this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cd.markForCheck();
        });

      this.deleteProductSubject.subscribe( (status: any) => {

        if (status.state === 'delete_product_error' && status.action === 'delete_product') {

          if (this.confirmationModal) {
            this.confirmationModal.hide();
          }
          if (this.approveModal) {
            this.approveModal.hide();
          }
          if (!this.errorModal) {
            this.errorModal = this.modalService.show(this.error_modal, {class: 'modal-lg'});
          } else {
          }

        } else if (status.state === 'no_error' && status.action === 'delete_product') {
          if (this.errorModal) { this.errorModal.hide(); }
          if (!this.confirmationModal) {this.confirmationModal = this.modalService.show(this.confirmation_template, { class: 'modal-lg' })}
        } else {
          //  TODO: modify this place
        }

      });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addToCart(): void {
        // TODO: add option to add number of items
        this.store.dispatch(new AddToCart(
          {
            id : this.product.id,
            quantity: 1
          }
        ));
    }

  removeItemConfirmation(template: TemplateRef<any>, deleteProduct: ProductDetails) {
    this.deleteProduct = deleteProduct;
    this.errorModal = null;
    this.approveModal = this.modalService.show(template, { class: 'modal-lg' });
  }

  removeItemFromProductList() {
    this.store.dispatch(new RemoveItemFromProductList(
      {
        id : this.deleteProduct.id
      }
    ));
    Object.assign(this.deleteProductState, { action: 'delete_product', state: 'no_errors' });
    this.deleteProductSubject.next(this.deleteProductState);
    this.approveModal.hide();
  }

  getProductUrl(product) {
    if (product && product.productInfo && product.productInfo.imageList.length > 0) {
      const url = product.productInfo.imageList[0]['imageUrl'] ? product.productInfo.imageList[0]['imageUrl'] :
        product.productInfo.imageList[0]['largeUrl'] ? product.productInfo.imageList[0]['largeUrl'] : '/assets/images/teapod.jpeg';
      return url;
    } else {
      return  '/assets/images/teapod.jpeg';
    }
  }

// TODO: remove or apply existing methods below:

  addToWishlist(): void {
      if (this.addingToWishlist) {
          return;
      }

      this.addingToWishlist = true;
      this.wishlist.add(this.product).subscribe({
          complete: () => {
              this.addingToWishlist = false;
              this.cd.markForCheck();
          }
      });
  }

  addToCompare(): void {
      if (this.addingToCompare) {
          return;
      }

      this.addingToCompare = true;
      this.compare.add(this.product).subscribe({
          complete: () => {
              this.addingToCompare = false;
              this.cd.markForCheck();
          }
      });
  }

  showQuickview(): void {
      if (this.showingQuickview) {
          return;
      }

      this.showingQuickview = true;
      this.quickview.show(this.product).subscribe({
          complete: () => {
              this.showingQuickview = false;
              this.cd.markForCheck();
          }
      });
  }

  ifSeller(): Observable<boolean> {
    return this.userDetails$.pipe(
      map(userData => userData.login ? userData.login.roles : undefined),
      map(roles => roles.filter(role => role.roleName === 'seller').length > 0)
    );
  }

}
