import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginService } from './services/login.service';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { AuthguardService } from './services/authguard.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    TranslateModule
  ],
  providers: [
    LoginService,
    ProductsService,
    CartService,
    AuthguardService
  ]
})
export class CoreModule { }
