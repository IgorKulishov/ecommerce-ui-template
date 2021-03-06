import { Action, ActionReducer } from '@ngrx/store';
import { AppStates } from '../../../app.states';
import {
  LOGIN_USER, GET_ORDER_NUMBER, LOG_OUT, FINISH_STORAGE_CLEARENCE,
  REGISTER_USER, REGISTER_USER_SUCCESS, ERROR_LOADING, SELECT_LANGUAGE,
  RE_LOGIN_ON_REFRESH
} from '../actions/login.actions';
import {CREATE_ORDER_NUMBER} from '../actions/login.actions';
import {INITIAL_USER_DATA} from '../states/auth.states';

export class ReducerClass implements Action {
  type: string;
  payload?: any;
}

const loadUserCredentials = ( state: AppStates = INITIAL_USER_DATA, action: ReducerClass ): AppStates => {
  const newUserDetailsState = { ...state.userDetails,  ...action.payload};
  const newSate: AppStates = { ...state, ...{ userDetails: newUserDetailsState} };
  return newSate;
};

const logOutUser = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newData: AppStates = Object.assign({}, state, {'userDetails' : INITIAL_USER_DATA} );
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
  const newUserDetails = {...state.userDetails, orderNumber: action.payload.orderNumber};
  return {...state, ...{userDetails: newUserDetails}};
};

const selectLanguage = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newUserDetails = {...state.userDetails, language: action.payload};
  return {...state, ...{userDetails: newUserDetails}};
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
    case FINISH_STORAGE_CLEARENCE:
      return state;
    case ERROR_LOADING:
      return indicateErrorOnLoading(state, action);
    case CREATE_ORDER_NUMBER:
      return storeOrderNumber(state, action);
    case SELECT_LANGUAGE:
      return selectLanguage(state, action);
    case RE_LOGIN_ON_REFRESH:
      return loadUserCredentials(state, action);
    default:
      return state;
  }
}
