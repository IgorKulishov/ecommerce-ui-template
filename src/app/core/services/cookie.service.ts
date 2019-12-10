import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AppCookieService {
  constructor(
    private cookieService: CookieService
  ) {}
  public logout(): any {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
    this.cookieService.delete('orderId');
    this.cookieService.delete('orderNumber');
    this.cookieService.delete('userName');
    this.cookieService.delete('userContent');
  }

  public storeTokenInCookie(data: any): void {
    this.cookieService.set('token', data.token);
    this.cookieService.set('userId', data.id);
    this.cookieService.set('userName', data.userName );
  }

  public setUserContent(data: any): void {
    this.cookieService.set('userContent', data);
  }

  public getUserContent(): any {
    return this.cookieService.get('userContent');
  }

  public storeOrderNumberInCookie(data: any): void {
    this.cookieService.set('orderNumber', data.orderNumber);
    this.cookieService.set('orderId', data.id);
  }

  public getOrderNumberFromCookie(): any {
    return this.cookieService.get('orderNumber');
  }

  public setPlacedOrderNumberInCookie(placedOrderNumber: any): void {
    this.cookieService.set('placedOrderId', placedOrderNumber);
  }

  public getPlacedOrderNumberFromCookie(): any {
    return this.cookieService.get('placedOrderId');
  }

  public getTokenFromCookie(): any {
    return this.cookieService.get('token');
  }
  public getUserNameFromCookie(): any {
    return this.cookieService.get('userName');
  }
  public getUserIdFromCookie(): any {
    return this.cookieService.get('userId');
  }

  getUserDetails() {
    const token = this.getTokenFromCookie();
    const userName = this.getUserNameFromCookie();
    const userId = this.getUserIdFromCookie();
    const orderNumber = this.getOrderNumberFromCookie();
    let userDetails: any;

    if (token && userName && userId && orderNumber) {
      userDetails = {
        token : token,
        userName : userName,
        id : userId,
        orderNumber : orderNumber
      };
    } else {
      userDetails = {};
    }
    return userDetails;
  }

}
