import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStates } from '../../../app.states';
import { SessionService } from '../../../core/services/session.service';
import { SelectLanguageAction } from '../../../auth/store/actions/login.actions';
import { languages} from '../../../core/consts/consts';
import {UserDetails} from '../../../auth/store/models/login.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$: Observable<any>;
  isCollapsed = true;
  isCollapsedSellerConsole = true;
  isCollapsedUserAccount = true;
  checkOutConfirmationStatus$: Observable<any>;
  user = undefined;
  currentUrl: string;
  languages: string[] = languages;
  selectedLanguage = 'en';

  screenSize: number;

  constructor(private sessionService: SessionService,
              private store: Store<AppStates>,
              private router: Router,
              private route: ActivatedRoute,
              private translateService: TranslateService) {
    // user properties for header
    this.store.select(res => {
        if (res && res['userLoginReducer'] && res['userLoginReducer']['userDetails']) {
          return res['userLoginReducer']['userDetails'];
        }
      }).pipe(
        map((userDetails: UserDetails) => {
          return userDetails;
        })
      ).subscribe(resp => {
        this.user = resp;
    });
    // cart properties for header
    this.cart$ = this.store.select( store => {
      return store['cart'];
    }).pipe(map((res: any) => {
      if (res && res.currentOrderInCart) {
        return res.currentOrderInCart;
      }
    }));

    this.checkOutConfirmationStatus$ = this.store.select( (store: any) => {
      return store['cart'];
    }).pipe(map(res => {
      if (res && res.checkOutConfirmationStatus) {
        return res.checkOutConfirmationStatus;
      }
    }));

    this.router.events.subscribe(currentRoute => {
      if (currentRoute instanceof RoutesRecognized) {
        switch (currentRoute.urlAfterRedirects.split('/')[1]) {
          case 'products':
            this.currentUrl = 'Products';
            break;
          case 'details':
            this.currentUrl = 'Details';
            break;
          case 'register':
            this.currentUrl = 'Register';
            break;
          case 'cart':
            this.currentUrl = 'Cart';
            break;
          case 'checkout':
            this.currentUrl = 'Checkout';
            break;
          case 'login':
            this.currentUrl = 'Login';
            break;
          default:
            this.currentUrl = 'Products';
            break;
        }
      }
    });
  }

  ngOnInit() {

  }

  onLanguageSelect(lang) {
    this.store.dispatch(new SelectLanguageAction(lang));
  }

  logout() {
    this.sessionService.logout();
  }

  onResize() {
    this.screenSize = window.innerWidth;
  }

}
