import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { Store } from '@ngrx/store';

import { CartService } from '../../services/cart.service';
// import { Product } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { QuickviewService } from '../../services/quickview.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';
import { takeUntil } from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {AddToCart} from '../../../cart/store/actions/cart.actions';
import { AppStates } from '../../../app.states';
import {ProductDetails} from '../../../products/store/models/products.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RemoveItemFromProductList} from '../../../products/store/actions/products.actions';

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
    @Input() productId: string;
    @Input() selectedQuantity: number;
    @Input() product: any;
    @Input() layout: 'grid-sm'|'grid-nl'|'grid-lg'|'list'|'horizontal'|null = null;

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    showingQuickview = false;

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
    ) { }

    ngOnInit(): void {
        this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cd.markForCheck();
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

}
