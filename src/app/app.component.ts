import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import {AppStates} from './app.states';
import {map} from 'rxjs/operators';
import {defaultLanguage} from './core/consts/consts';
import {UserDetails} from './auth/store/models/login.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-commerce';
  selectedLanguage = undefined;

  constructor(
    private translateService: TranslateService,
    private store: Store<AppStates>
  ) {
    this.store.select(
      res => {
        if (res && res['userLoginReducer'] && res['userLoginReducer']['userDetails']) {
          return res['userLoginReducer']['userDetails'];
        }
      })
      .pipe(
        map((userDetails: UserDetails) => {
          return userDetails;
        })
      ).subscribe((userDetailsData: UserDetails) => {
        // 1. language was not defined from API and was not selected previously:
        if (!userDetailsData || !userDetailsData.language && !this.selectedLanguage) {
          this.selectedLanguage = defaultLanguage;
          this.translateService.use(this.selectedLanguage);
        } else if (userDetailsData.language && userDetailsData.language !== this.selectedLanguage) {
          // 2. language was selected (switched):
          this.selectedLanguage = userDetailsData.language;
          this.translateService.use(this.selectedLanguage);
        }
    });
  }
}
