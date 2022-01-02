import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { coreReducer } from './core';
import { userReducer } from './user';
import { ritReducer } from './rit';
import { instituteReducer } from './institute';
import { LOGOUT_SUCCESS } from '../actiontypes';

const appReducer = combineReducers({
  auth: authReducer,
  core: coreReducer,
  user: userReducer,
  rit: ritReducer,
  institute: instituteReducer
});

const rootReducer = (state = {}, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;