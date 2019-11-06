import { createFeatureSelector} from '@ngrx/store';
import {UserDetails} from '../models/login.model';

// 1. selector
export const getAuthSelector = createFeatureSelector<UserDetails>('userLoginReducer');

// 2. Mappers
export const loginUserDetailsMapper = ( data: any) => {
  if (data && data.userDetails) {
    return data.userDetails;
  } else {
    return ;
  }
};

export const registerUserMapper = (data: any) => {
  if (data && data.registerUser) {
    return data.registerUser;
  } else {
    return ;
  }
};

export const loginErrorMapper = ( data: any) => {
  if (data && data.errorLoading && data.errorLoading.error) {
    return {
      message: data.errorLoading.error,
      status: data.errorLoading.status
    };
  } else {
    return ;
  }
};
