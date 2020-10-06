import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class SessionService {
  constructor() {}

  static getSession(sessionObjectName: string) {
    return window.sessionStorage.getItem(sessionObjectName);
  }
  static setSession(sessionObjectName: string, sessionObjectKey: string): void {
    window.sessionStorage.setItem(sessionObjectName, sessionObjectKey);
  }
  static deleteSession(sessionObjectName: string): void {
    window.sessionStorage.removeItem(sessionObjectName);
  }

  public logout(): any {
    SessionService.deleteSession('token');
    SessionService.deleteSession('userId');
    SessionService.deleteSession('orderId');
    SessionService.deleteSession('orderNumber');
    SessionService.deleteSession('userName');
    SessionService.deleteSession('userContent');
  }

  public storeTokenInSession(data: any): void {
    SessionService.setSession('token', data.token);
    SessionService.setSession('userId', data.id);
    SessionService.setSession('userName', data.userName );
  }

  public setUserContent(data: any): void {
    SessionService.setSession('userContent', data);
  }

  public getUserContent(): any {
    return SessionService.getSession('userContent');
  }

  public storeOrderNumberInStorage(data: any): void {
    SessionService.setSession('orderNumber', data.orderNumber);
    SessionService.setSession('orderId', data.id);
  }

  public getOrderNumberFromStorage(): any {
    return SessionService.getSession('orderNumber');
  }

  public setPlacedOrderNumberInStorage(placedOrderNumber: any): void {
    SessionService.setSession('placedOrderId', placedOrderNumber);
  }

  public getPlacedOrderNumberFromStorage(): any {
    return SessionService.getSession('placedOrderId');
  }

  public getTokenFromStorage(): any {
    return SessionService.getSession('token');
  }
  public getUserNameFromStorage(): any {
    return SessionService.getSession('userName');
  }
  public getUserIdFromStorage(): any {
    return SessionService.getSession('userId');
  }

  getUserDetails() {
    const token = this.getTokenFromStorage();
    const userName = this.getUserNameFromStorage();
    const userId = this.getUserIdFromStorage();
    const orderNumber = this.getOrderNumberFromStorage();
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
