import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { ISubscription } from 'rxjs/Subscription';
import { ProductsService } from '../../../core/services/products.service';
import { GetProductDetails, ResetProductDetails } from '../../store/actions/products.actions';
import { AddToCart } from '../../../cart/store/actions/cart.actions';
import { AppStates } from '../../../app.states';
import { LoginService } from '../../../core/services/login.service';
import { ProductDetails, ProductInfo} from '../../store/models/products.model';
import {ImageList} from '../../store/models/products.model';
import { NgxImgZoomService} from 'ngx-img-zoom';

declare var lightGallery: Function;

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  slug: string;
  productDetail$: Observable<ProductDetails>;
  productDetailSubscribtion: ISubscription;
  routeSubscribtion: ISubscription;
  productId: string;
  images: ImageList[];
  slidesChangeMessage = '';
  /*** Configurations: ***/
  showErrorMsgs = true;
  // TODO: add lnanguage toggle
  defaultLanguage = 'en';
  itemsPerSlide = 1;
  maxItemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  selectedQuantity = 1;
  showNext = false;
  showPrev = false;
  // TODO : add max stock product amount in create product API or logic to update stock remaining (for now harcoding to 10 max)
  maxQuantity = 10;
  minQuantity = 1;
  @ViewChild('lightGallery', {static: false}) lightgalleryID: ElementRef;
  imgs = [
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'},
    {url: 'https://www.futuresplatform.com/sites/default/files/styles/article_hero_image/public/2018-04/Future%20of%20Airplanes.jpg?itok=Oj9J2usE'}
  ];
  constructor(private store: Store<AppStates>,
              private loginService: LoginService,
              private router: Router,
              private productsService: ProductsService,
              private route: ActivatedRoute,
              private translateService: TranslateService,
              private zoomService: NgxImgZoomService
              ) {
                // this.zoomService.setZoomBreakPoints([
                //   { w: 10, h: 10 },
                //   { w: 15, h: 15 },
                //   { w: 20, h: 20 },
                //   { w: 25, h: 25 },
                //   { w: 30, h: 30 }
                // ]);
              }

  ngOnInit() {
    this.productDetail$ = this.store.select(store => {
      if (store && store['productsReducer']) {
        return store['productsReducer'];
      }
    }).pipe(
      filter(productStore => productStore && productStore['uiStateProductDetails']),
      map((res: any) => {
        if (res && res.uiStateProductDetails && res.uiStateProductDetails.productInfo) {
          this.productId = res.uiStateProductDetails.id;
          this.images = res.uiStateProductDetails.productInfo.imageList;
          this.itemsPerSlide = this.images.length < 3 ? this.images.length : 3;
          return res.uiStateProductDetails;
        } else {
          return;
        }
      })
    );

    this.routeSubscribtion = this.route.params.subscribe(
      (params: any) => {
        this.slug = params['slug'];
        this.store.dispatch(new GetProductDetails({ slug : this.slug }));
      }
    );

    this.productDetail$.subscribe(productDetail => {
      if (productDetail && productDetail.defaultMaxQuantity) {
        this.maxQuantity = productDetail.defaultMaxQuantity;
      }
    });

    // this.translateService.use(this.defaultLanguage);
  }

  ngOnDestroy() {
    // this.routeSubscribtion.unsubscribe();
    // this.productDetailSubscribtion.unsubscribe();
    this.store.dispatch(new ResetProductDetails());
  }

  addToCart() {
    // TODO: add option to add number of items
    this.store.dispatch(new AddToCart(
      {
        id : this.productId,
        quantity: this.selectedQuantity
      }
    ));
  }

  initGallery(index?: number) {
    lightGallery(this.lightgalleryID.nativeElement, {
      thumbnail: true,
      download : false,
      dynamic  : true,
      index: index ? index : 0,
      dynamicEl: this.images.map(image => {
        return {
          'src': image.imageUrl,
          'thumb': image.imageUrl
        };
      })
    });
  }

  onSelectedQuantity(quantity) {
    this.selectedQuantity = quantity;
  }

  countSum(price, selectedQuantity) {
    return Math.round(price * selectedQuantity * 100)/100;
  }

  getProductUrl(product) {
    if (product && product.imageList.length > 0) {
      const url = product.imageList[0]['imageUrl'] ? product.imageList[0]['imageUrl'] :
        product.imageList[0]['largeUrl'] ? product.imageList[0]['largeUrl'] : '/assets/images/teapod.jpeg';
      // console.log(url);
      return url;
    } else if (product && product.imageList.length === 0) {
      return  '/assets/images/teapod.jpeg';
    }
  }

  onSlideRangeChange(indexes: number[]): void {
    // this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

}
