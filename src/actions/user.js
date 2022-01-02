import api from '../utils/api';
import {requestOptions} from '../utils/authHeader';
import { loadRitFrequency } from './rit';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  GET_PROFILE,
  MEMBER_COUNT,
  NO_PROFILE,
  USER_LOAD_ERROR,
  USER_LIST_LOAD,
  USER_LIST_LOAD_ERROR
} from '../actiontypes';

// LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const res = await api.get('users/me', requestOptions(getState));
    dispatch(updateUserStatusAfterLogin(res.data.id));
    // dispatch(loadRitFrequency());

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// UPDATE USER STATUS AFTER LOGIN
export const updateUserStatusAfterLogin = (id) => async (dispatch, getState) => {
  const body = JSON.stringify({ status: "Online" });

  try {
    const res = await api.patch(`users/${id}/`, body, requestOptions(getState));
    debugger
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    dispatch(members());
    dispatch(loadRitFrequency());

  } catch (err) {
    dispatch({
      type: USER_LOAD_ERROR
    });
  }
};

// UPDATE USER STATUS AFTER LOGIN
export const updateUserStatusAfterLogout = (id) => async (dispatch, getState) => {
  
  const body = JSON.stringify({ status: "Offline" });

  try {
    await api.patch(`users/${id}/`, body, requestOptions(getState));
  } catch (err) {
    dispatch({
      type: USER_LOAD_ERROR
    });
  }
};

// LOAD ACTIVE, INACTIVE, ONLINE USER COUNT
export const members = () => async (dispatch, getState) => {

    const res = await api.get('users/members/', requestOptions(getState));
    dispatch({
        type: MEMBER_COUNT,
        payload: res.data
    });
    
}

// LOAD USER PROFILE
export const profile = (id) => async (dispatch, getState) => {

  try{
    const res = await api.get(`users/${id}`, requestOptions(getState));
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: NO_PROFILE
    });
  }
}

// LOAD USER PROFILE
export const loadUserList = () => async (dispatch, getState) => {

  try{
    const res = await api.get(`users/`, requestOptions(getState));
    dispatch({
      type: USER_LIST_LOAD,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: USER_LIST_LOAD_ERROR
    });
  }
}

// LOAD CHECK USER CAN BE CREATED STATUS
export const checkUserCanBeCreated = (fi_id, branch_id) => async (dispatch, getState) => {

  try{
    const res = api.get(`registration/check-limit/?fi_id=${fi_id}&branch_id=${branch_id}`);
    return res;
  }
  catch (err) {
    return null;
  }
}