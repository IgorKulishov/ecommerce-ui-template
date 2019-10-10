 import { Action, ActionReducer } from '@ngrx/store';

import { AppStates } from '../../../products/store/states/app.states';
import { LOGIN_USER, GET_ORDER_NUMBER, LOG_OUT, FINISH_COOKIES_CLEARENCE,
  REGISTER_USER, REGISTER_USER_SUCCESS, ERROR_LOADING  } from '../actions/login.actions';
import {CREATE_ORDER_NUMBER} from '../actions/login.actions';

export class ReducerClass implements Action {
  type: string;
  payload?: any;
};

const logoutPayload = {
  'id':          null,
  'userName':    undefined,
  'orderNumber': null,
  'mobile':      null,
  'token':       undefined
};

const loadUserCredentials = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newData: AppStates = Object.assign({}, state, { userDetails: action.payload} );
  return newData;
};

const logOutUser = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newData: AppStates = Object.assign({}, state, { userDetails: logoutPayload} );
  return newData;
};

const registerUserSuccess = ( state , action): AppStates => {
  const newData: AppStates = Object.assign({}, state, { registerUserState: action.payload });
  return newData;
}

const indicateErrorOnLoading = ( state , action): AppStates => {
 const newData: AppStates = Object.assign({}, state, { errorLoading: action.payload });
 return newData;
};

const storeOrderNumber = ( state: AppStates, action: ReducerClass ): AppStates => {
 const newData: AppStates = Object.assign({}, state, {userDetails : {orderNumber: action.payload.orderNumber}} );
 return newData;
};

export function userLoginReducer (state: AppStates, action: ReducerClass) {
  switch (action.type) {
    case GET_ORDER_NUMBER:
      return loadUserCredentials(state, action);
    case REGISTER_USER:
      return state;
    case REGISTER_USER_SUCCESS:
      return registerUserSuccess(state, action);
    case LOG_OUT:
      return logOutUser(state, action);
    case FINISH_COOKIES_CLEARENCE:
      return state;
    case ERROR_LOADING:
      return indicateErrorOnLoading(state, action);
    case CREATE_ORDER_NUMBER:
      return storeOrderNumber(state, action);
    default:
      return state;
  }
};
