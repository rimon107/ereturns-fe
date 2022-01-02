import {
    FINANCIAL_INSTITUTE_LOAD,
    FINANCIAL_INSTITUTE_LOAD_ERROR,
    LOGOUT_SUCCESS,
    BRANCH_LOAD,
    BRANCH_LOAD_ERROR,
    FINANCIAL_INSTITUTE_USER_COUNT_LOAD,
    FINANCIAL_INSTITUTE_USER_COUNT_LOAD_ERROR
  } from '../actiontypes';
  
  const initialState = {
    institutes: null,
    branches: null,
    users: null
  }
  
  export const instituteReducer =  (state = initialState,  action)  =>  {
    switch (action.type) {
      case FINANCIAL_INSTITUTE_LOAD:
        return {
          ...state,
          institutes: action.payload
        };
      case BRANCH_LOAD:
        return {
          ...state,
          branches: action.payload
        };
      case FINANCIAL_INSTITUTE_USER_COUNT_LOAD:
        return {
          ...state,
          users: action.payload
        };
      case FINANCIAL_INSTITUTE_USER_COUNT_LOAD_ERROR:
        return {
          ...state,
          users: null
        };
      case FINANCIAL_INSTITUTE_LOAD_ERROR:
        return {
          ...state,
          institutes: null
        };
      case BRANCH_LOAD_ERROR:
        return {
          ...state,
          branches: null,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          institutes: null,
          branches: null,
          users: null
        };
      default:
        return state;
    }
  }
  
  
  
  
  