import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import { AppStates } from 'd:/Andrey/prog/Andrew/project_igor/ecommerce-ui-template/src/app/app.states';
import { SelectLanguageAction } from 'd:/Andrey/prog/Andrew/project_igor/ecommerce-ui-template/src/app/auth/store/actions/login.actions';

import { languages} from 'd:/Andrey/prog/Andrew/project_igor/ecommerce-ui-template/src/app/core/consts/consts';
import { SessionService } from 'd:/Andrey/prog/Andrew/project_igor/ecommerce-ui-template/src/app/core/services/session.service';

@Component({
  selector: 'app-upper-header',
  templateUrl: './upper-header.component.html',
  styleUrls: ['./upper-header.component.scss']
})
export class UpperHeaderComponent implements OnInit{
  languages: string[] = languages;
  selectedLanguage = 'en';

  constructor(private sessionService: SessionService,
              private store: Store<AppStates>,
              private translateService: TranslateService) {
  }

  ngOnInit(){}

  logout() {
    this.sessionService.logout();
  }
  onLanguageSelect(lang) {
    this.store.dispatch(new SelectLanguageAction(lang));
  }
}
