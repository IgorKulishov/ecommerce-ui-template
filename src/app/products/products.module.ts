import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsEffects } from './store/effects/products.effects';
import { CoreModule } from '../core/core.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { SharedModule } from '../shared/shared.module';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { AddDetailsComponent } from './components/create-product/add-details/add-details.component';
import { UploadImagesComponent } from './components/create-product/upload-images/upload-images.component';
import { AddToCartComponent } from './components/child-components/add-to-cart/add-to-cart.component';
import { ShopSidebarComponent } from './components/child-components/shop-sidebar/shop-sidebar.component';
import { AuthguardService } from '../core/services/authguard.service';
import { productsReducer } from './store/reducers/reducers';
import { ShopSidebarService } from './services/shop-sidebar.service';

const routes: Routes = [
  {path: 'products', component: ProductListComponent, canActivate: [AuthguardService]},
  {path: 'details/:slug', component: ProductDetailsComponent, canActivate: [AuthguardService]},
  {path: 'create-product', component: CreateProductComponent, canActivate: [AuthguardService],
    children: [
      {path: '', redirectTo: 'add-details', pathMatch: 'full'},
      {path: 'add-details', component: AddDetailsComponent},
      {path: 'upload-images/:slug', component: UploadImagesComponent}
    ]
  }
  // {path: '**', component: ProductListComponent, canActivate: [AuthguardService]}
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    WidgetsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('productsReducer', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
    AlertModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    AddToCartComponent,
    ShopSidebarComponent,
    AddDetailsComponent,
    UploadImagesComponent,
    ProductsViewComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProductsEffects,
    ShopSidebarService
  ]
})
export class ProductsModule { }
