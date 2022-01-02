import api from '../utils/api';

import {
  FINANCIAL_INSTITUTE_LOAD,
  FINANCIAL_INSTITUTE_LOAD_ERROR,
  BRANCH_LOAD,
  BRANCH_LOAD_ERROR,
  FINANCIAL_INSTITUTE_USER_COUNT_LOAD,
  FINANCIAL_INSTITUTE_USER_COUNT_LOAD_ERROR
} from '../actiontypes';

// LOAD INSTITUTES
export const loadInstitutes = () => async (dispatch, getState) => {

  try{
    const res = await api.get('institutes/');
    dispatch({
      type: FINANCIAL_INSTITUTE_LOAD,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: FINANCIAL_INSTITUTE_LOAD_ERROR
    });
  }
};

// LOAD BRANCHES
export const loadBranches = (fi_id) => async (dispatch, getState) => {

  try{
    const res = await api.get(`institutes/branch?fi_id=${fi_id}`);
    dispatch({
      type: BRANCH_LOAD,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: BRANCH_LOAD_ERROR
    });
  }
};

// LOAD BRANCHES
export const loadInstituteUserCount = (fi_id, branch_id) => async (dispatch, getState) => {

  try{
    let res;
    if(branch_id !== 0){
      res = await api.get(`institutes/user-count?fi_id=${fi_id}&branch_id=${branch_id}`);
    } else {
      res = await api.get(`institutes/user-count?fi_id=${fi_id}`);
    }
    
    dispatch({
      type: FINANCIAL_INSTITUTE_USER_COUNT_LOAD,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: FINANCIAL_INSTITUTE_USER_COUNT_LOAD_ERROR
    });
  }
};