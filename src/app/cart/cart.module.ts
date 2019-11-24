import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cartReducer } from './store/reducers/cart.reducers';
import { CartEffects } from './store/effects/cart.effects';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import {StoreModule} from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoreModule } from '../core/core.module';
import { PlacedOrdersComponent} from './components/placed-orders/placed-orders.component';

const routes: Routes = [
  {path: 'cart', component: CartDetailsComponent},
  // {path: 'delivery', component: undefined},
  {path: 'checkout', component: CartCheckoutComponent},
  {path: 'placed-orders', component: PlacedOrdersComponent}
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([CartEffects]),
    StoreModule.forFeature('cartReducer', cartReducer),
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    CartDetailsComponent,
    CartCheckoutComponent,
    PlacedOrdersComponent
  ]
})
export class CartModule { }
