import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN,
    MEMBER_COUNT
  } from '../actiontypes';
  
  const initialState = {
    isLoading: false,
    isAuthenticated: null,
    user: null,
    members: null,
    registration: null
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          user: action.payload
        };
      case MEMBER_COUNT:
        return {
          ...state,
          members: action.payload
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          registration: action.payload
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          ...action.payload
        };
      case AUTH_ERROR:
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          access: null,
          refresh: null,
          registration: null,
        };
      case REFRESH_TOKEN:
          return {
            ...state,
            ...action.payload
          };
      default:
        return state;
    }
  }