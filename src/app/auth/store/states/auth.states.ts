import { defaultLanguage, defaultRole} from '../../../core/consts/consts';
import { UserDetails, Login, Role } from '../models/login.model';

export const role: Role = {
  'description': null,
  'id': null,
  'roleName': undefined
};

export const login: Login = {
  'id': null,
  'roles': [role]
};

export const INITIAL_USER_DATA: any = {
  'userDetails': {
    'id': null,
    'userName': undefined,
    'orderNumber': null,
    'mobile': null,
    'token': undefined,
    'language': defaultLanguage,
    'login': login
  }
};
