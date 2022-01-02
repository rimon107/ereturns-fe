import {
    GET_PROFILE,
    NO_PROFILE,
    LOGOUT_SUCCESS,
    USER_LOAD_ERROR,
    USER_LIST_LOAD,
    USER_LIST_LOAD_ERROR
  } from '../actiontypes';
  
  const initialState = {
    user: null,
    users: null
  }
  
  export const userReducer =  (state = initialState,  action)  =>  {
    switch (action.type) {
      case GET_PROFILE:
        return {
          ...state,
          user: action.payload
        };
      case USER_LIST_LOAD:
        return {
          ...state,
          users: action.payload
        };
      case USER_LIST_LOAD_ERROR:
        return {
          ...state,
          users: null
        };
      case NO_PROFILE:
      case USER_LOAD_ERROR:
        return {
          ...state,
          user: null
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          user: null,
          users: null
        };
      default:
        return state;
    }
  }
  
  
  
  
  