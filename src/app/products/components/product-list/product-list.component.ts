import {map} from 'rxjs/operators';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GetProducts } from '../../store/actions/products.actions';
import { AppStates } from '../../../app.states';
import { Products } from '../../store/models/products.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { SessionService } from '../../../core/services/session.service';
import { RemoveItemFromProductList } from '../../store/actions/products.actions';
import { ProductDetails} from '../../store/models/products.model';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Products[]>;
  public error = false;
  @ViewChild('confirmation_template', {'static': false}) confirmation_template: ModalDirective;
  @ViewChild('error_modal', {'static': false}) error_modal: ModalDirective;
  approveModal: BsModalRef | null;
  confirmationModal: BsModalRef | null;
  errorModal: BsModalRef | null;
  deleteProduct: ProductDetails;
  deleteProductState: {action: string; state: string; } = {action: undefined, state: undefined};
  deleteProductSubject: BehaviorSubject<{action: string; state: string;}> = new BehaviorSubject({action: undefined, state: undefined});
  // Template basic settings:
  filters: any[] = [];
  sidebarPosition: 'start'|'end' = 'start';
  viewMode: 'grid'|'grid-with-features'|'list' = 'grid';
  columns: 3|4|5 = 3;

  constructor(private store: Store<AppStates>,
              private sessionService: SessionService,
              private router: Router,
              private modalService: BsModalService
            ) {

    this.products$ = this.store.select(
      res => {
        if (res && res['userLoginReducer'] ) {
          if (res['userLoginReducer']['errorLoading']  &&
            res['userLoginReducer']['errorLoading']['error_message'] === 'remove_product_error') {
            Object.assign(this.deleteProductState, { state: 'delete_product_error' });
          } else {
            Object.assign(this.deleteProductState, { state: 'no_errors' });
          }
          this.deleteProductSubject.next(this.deleteProductState);
        } if (res && res['productsReducer']) {
          return res['productsReducer'];
        }
      }
    ).pipe(map((v: any) => {
        if (v) {
          return v.storeData;
        }
    }));
  }

  ngOnInit() {
    if (this.sessionService.getTokenFromStorage() != null ) {
      this.store.dispatch(new GetProducts());
    } else {
      this.router.navigate(['/login']);
    }

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
          if (this.errorModal) {this.errorModal.hide()}
          if (!this.confirmationModal) {this.confirmationModal = this.modalService.show(this.confirmation_template, { class: 'modal-lg' })}
        } else {
      //  TODO: modify this place
      }

    });
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

  deleteProductConfirmation(template: TemplateRef<any>, deleteProduct: ProductDetails) {
    this.deleteProduct = deleteProduct;
    this.errorModal = null;
    this.approveModal = this.modalService.show(template, { class: 'modal-lg' });
  }

  getProductUrl(product) {
    if (product && product.productInfo && product.productInfo.imageList.length > 0) {
      return product.productInfo.imageList[0]['imageUrl'] ? product.productInfo.imageList[0]['imageUrl'] :
        product.productInfo.imageList[0]['largeUrl'] ? product.productInfo.imageList[0]['largeUrl'] : '/assets/images/teapod.jpeg';
    } else {
      return  '/assets/images/teapod.jpeg';
    }
  }

}
