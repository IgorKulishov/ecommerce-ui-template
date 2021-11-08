import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { cartReducer } from "./store/reducers/cart.reducers";
import { CartEffects } from "./store/effects/cart.effects";
import { CartDetailsComponent } from "./components/cart-details/cart-details.component";
import { CartCheckoutComponent } from "./components/cart-checkout/cart-checkout.component";
import { StoreModule } from "@ngrx/store";
import { ModalModule } from "ngx-bootstrap/modal";
import { CoreModule } from "../core/core.module";
import { PlacedOrdersComponent } from "./components/placed-orders/placed-orders.component";
import { SharedModule } from "../shared/shared.module";
import { AllOrdersComponent } from "./components/all-orders/all-orders.component";
import { AllOrdersContentComponent } from "./components/all-orders/all-orders-content/all-orders-content.component";
import { AllOrdersFilterComponent } from "./components/all-orders/all-orders-filter/all-orders-filter.component";

const routes: Routes = [
  { path: "cart", component: CartDetailsComponent },
  // {path: 'delivery', component: undefined},
  { path: "checkout", component: CartCheckoutComponent },
  { path: "placed-orders", component: PlacedOrdersComponent },
  { path: "all-orders", component: AllOrdersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([CartEffects]),
    StoreModule.forFeature("cart", cartReducer),
    RouterModule.forChild(routes),
    SharedModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  declarations: [
    CartDetailsComponent,
    CartCheckoutComponent,
    PlacedOrdersComponent,
    AllOrdersComponent,
    AllOrdersContentComponent,
    AllOrdersFilterComponent,
  ],
  providers: [DatePipe],
})
export class CartModule {}
