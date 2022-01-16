import api from '../utils/api';
import {requestOptions} from '../utils/authHeader';
import { loadUser, updateUserStatusAfterLogout } from './user';
// import { stopSubmit } from 'redux-form';


import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actiontypes';

// LOGIN USER
export const login = (username, password) => async dispatch => {

  const body = JSON.stringify({ username, password });

  try {
    const res = await api.post('auth/login/', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
    // dispatch(stopSubmit('loginForm', err.response.data));
  }
};

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {

  const auth = getState().auth;
  try {
    dispatch(updateUserStatusAfterLogout(auth.user.id));
  } catch (err) {
    
  }
  const body = {
    refresh: auth.refresh
  }
  try {
    await api.post('auth/logout/', body, requestOptions(getState));
    
    dispatch({
      type: LOGOUT_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL
    });
  }
  
}

export const refreshToken = (token) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: token,
  })
}

// REGISTER USER
export const register = (financial_institute_type_id, financial_institute_id, 
                          branch_id, employee_name, password, designation, 
                          department, email, mobile, phone, report_type) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request Body
  const body = JSON.stringify({ financial_institute_type_id, financial_institute_id, 
                                branch_id, employee_name, password, designation, 
                                department, email, mobile, phone, report_type });
  try {
    const res = await api.post('registration/add/', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
    // dispatch(stopSubmit('registerForm', err.response.data));
  }
};

