import { defaultLanguage, defaultRole} from '../../../core/consts/consts';
export const INITIAL_USER_DATA: any = {
  'userDetails': {
    'id':          null,
    'userName':    undefined,
    'orderNumber': null,
    'mobile':      null,
    'token':       undefined,
    'language':    defaultLanguage,
    'role':        defaultRole
  }
};
