import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import {getAuthSelector, loginErrorMapper, registerUserMapper} from '../../store/select/auth.selectors';
import { AppStates } from '../../../app.states';
import { LoginService } from '../../../core/services/login.service';
import { RegisterUserAction } from '../../store/actions/login.actions';
import {ErrorMessage} from '../login/login.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: ErrorMessage;
  loading = false;

  constructor(private router: Router,
              private loginService: LoginService,
              private store: Store<AppStates>,
              private fb: FormBuilder) {
              }

    ngOnInit() {
      this.store.select( getAuthSelector).pipe(
      map(registerUserMapper))
      .subscribe(res => {
        if (res && res.userName) {
          this.router.navigate(['/login']);
        }
      });

      this.registerForm = this.fb.group({
        userName: [null, [Validators.required, Validators.minLength(6)]],
        email:    [null, [Validators.required, Validators.minLength(6), Validators.email]],
        mobile:   [null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
      });

      // Error handing
      this.store.select(getAuthSelector).pipe(
        map(loginErrorMapper)
      )
      .subscribe((error: ErrorMessage) => {
        if ( error && error.message ) {
          this.errorMessage = error;
          this.loading = false;
        }
      });
    }

    register() {
      this.store.dispatch(new RegisterUserAction(this.registerForm.value));
    }

}
