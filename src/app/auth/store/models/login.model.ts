export interface UserDetails {
  'id':          number;
  'userName':    string;
  'orderNumber'?: string;
  'mobile':      number;
  'token':       string;
  'language'?:    string;
}

export interface UserCredentials {
  'password': string;
  'userName': string;
}

