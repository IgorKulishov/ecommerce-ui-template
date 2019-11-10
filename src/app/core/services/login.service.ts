import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials, UserDetails, RegisterUser } from '../../auth/store/models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppCookieService } from './cookie.service';
import { environment } from '../../../environments/environment';
@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private appCookieService: AppCookieService) { }

  login(data?: {action: string; payload: UserCredentials}): Observable<UserDetails> {
    const userCredentials: UserCredentials = data.payload;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers
    };

    return this.http.post<Observable<UserDetails>>(
      environment.REST_API + '/rest/login/', userCredentials, options
    ).pipe(
        map((res: any) => {
            this.appCookieService.storeTokenInCookie(res);
            return res;
        })
    );
  }

  register(data?: any): Observable<RegisterUser> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers
    };
    return this.http.post(
      environment.REST_API + '/rest/register', data, options
    ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
