import {map} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAuthSelector, loginUserDetailsMapper, loginErrorMapper } from '../../store/select/auth.selectors';
import { UserCredentials } from '../../store/models/login.model';
import { AppCookieService } from '../../../core/services/cookie.service';
import { LoginAction } from '../../store/actions/login.actions';
import {WebSocketSubject, webSocket} from 'rxjs/webSocket';

export class Message {
  constructor(
    public sender: string,
    public content: string,
    public isBroadcast = false,
  ) { }
}
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public ws_message: string;
  loginForm: FormGroup;
  errorMessage = '';
  userName$;
  loading = false;
  user: string;
  private socket$: WebSocketSubject<Message>;
  constructor(private appCookieService: AppCookieService,
              private router: Router,
              private store: Store<UserCredentials>,
              @Inject(FormBuilder) fb: FormBuilder) {

    this.socket$ = webSocket('ws://localhost:8000');

    this.loginForm = fb.group({
      userName: [null, Validators.minLength(3)],
      password: [null, Validators.minLength(3)]
    });
  }
  login() {
    this.store.dispatch(new LoginAction(this.loginForm.value));
    this.loading = true;
  }

  submitWsMessage() {
    const submitMessage = new Message('client1', this.ws_message, false);
    this.socket$.next(submitMessage);
  }

  ngOnInit() {
    // Login
    this.store.select(getAuthSelector).pipe(
      map(loginUserDetailsMapper))
      .subscribe(res => {
        if (res && res.token) {
          this.loading = false;
          this.router.navigate(['/products']);
        }
      });
    // Error handing
    this.store.select(getAuthSelector).pipe(
      map(loginErrorMapper))
      .subscribe(error => {
        this.errorMessage = error;
        this.loading = false;
        console.log(error);
      });

    if (this.appCookieService.getTokenFromCookie() != null) {
      // this.router.navigate(['/products']);
    }
    this.socket$
      .subscribe(
        (message) => console.log(message),
        (err) => console.error(err),
        () => console.warn('Completed!')
      );
  }

}
