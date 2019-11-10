import {defaultLanguage} from '../../../core/consts/consts';

export interface UserCredentials {
  'password': string;
  'userName': string;
}

export interface Role {
  'description': string;
  'id': number;
  'roleName': string;
}

export interface Login {
  'id': number;
  'roles': Role[];
}

export interface UserDetails {
  'id':          number;
  'userName':    string;
  'orderNumber'?: string;
  'mobile':      number;
  'token':       string;
  'language'?:   string;
  'login': Login;
}

export interface RegisterUser {
  'id':          number;
  'userName':    string;
  'password'?:   string;
  'token':       string;
  'mobile':      number;
  'login':       Login;
}
