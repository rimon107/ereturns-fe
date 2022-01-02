import api from '../utils/api';
import {requestOptions, requestFormOptions} from '../utils/authHeader';

import {
    RIT_FREQUENCY_LOAD,
    RIT_FREQUENCY_LOAD_ERROR,
    RIT_FEATURE_LOAD,
    RIT_FEATURE_LOAD_ERROR,
    RIT_UPLOAD_LIST_LOAD,
    RIT_UPLOAD_LIST_LOAD_ERROR,
    RIT_DEFAULT_FILE_LOAD,
    RIT_DEFAULT_FILE_LOAD_ERROR,
    RIT_DEPARTMENT_LOAD,
    RIT_DEPARTMENT_LOAD_ERROR,
    RIT_DEPARTMENT_FILES_LOAD,
    RIT_DEPARTMENT_FILES_LOAD_ERROR,
    RIT_REPORT_DATA_LOAD,
    RIT_REPORT_DATA_LOAD_ERROR,
    RIT_UPLOADED,
    RIT_UPLOAD_ERROR
} from '../actiontypes';

// LOAD Rit Frequency
export const loadRitFrequency = () => async (dispatch, getState) => {
  try {
    const res = await api.get('rit/frequency/', requestOptions(getState));
    dispatch({
      type: RIT_FREQUENCY_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_FREQUENCY_LOAD_ERROR
    });
  }
}

// LOAD Rit Features
export const loadRitFeatures = (frequency_id=null) => async (dispatch, getState) => {
  try {
    let res;
    if(frequency_id){
      res = await api.get(`rit/features/?frequency_id=${frequency_id}`, requestOptions(getState));
    } else{
      res = await api.get('rit/features/', requestOptions(getState));
    }
    
    dispatch({
      type: RIT_FEATURE_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_FEATURE_LOAD_ERROR
    });
  }
}

// LOAD Rit Upload List
export const loadRitUploadList = () => async (dispatch, getState) => {
  try {
      const res = await api.get('rit/supervision/', requestOptions(getState));
    dispatch({
      type: RIT_UPLOAD_LIST_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_UPLOAD_LIST_LOAD_ERROR
    });
  }
}

// LOAD Rit Default Files
export const loadRitDefaultFiles = () => async (dispatch, getState) => {
  try {
      const res = await api.get('rit/files/', requestOptions(getState));
    dispatch({
      type: RIT_DEFAULT_FILE_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_DEFAULT_FILE_LOAD_ERROR
    });
  }
}

// LOAD Rit Departments
export const loadRitDepartments = () => async (dispatch, getState) => {
  try {
      const res = await api.get('rit/departments/', requestOptions(getState));
    dispatch({
      type: RIT_DEPARTMENT_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_DEPARTMENT_LOAD_ERROR
    });
  }
}

// LOAD Rit Departments
export const loadRitFilesByDepartments = (department_id) => async (dispatch, getState) => {
  try {
      const res = await api.get(`rit/files/?department_id=${department_id}`, requestOptions(getState));
    dispatch({
      type: RIT_DEPARTMENT_FILES_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_DEPARTMENT_FILES_LOAD_ERROR
    });
  }
}

// LOAD Rit Upolad Status Report According to the Base Date
export const loadRitUploadStatusReportByBaseDate = (rit, fi, base_date, date_from, date_to) => async (dispatch, getState) => {

  try {
      const res = await api.get(`rit/report/upload-status/base-date-wise/?rit_id=${rit}&fi_id=${fi}&base_date=${base_date}&date_from=${date_from}&date_to=${date_to}`, requestOptions(getState));
    dispatch({
      type: RIT_REPORT_DATA_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_REPORT_DATA_LOAD_ERROR
    });
  }
}

// LOAD Rit Upolad Status Report According to the Bank
export const loadRitUploadStatusReportByFI = (rit, fi, date_from) => async (dispatch, getState) => {

  try {
      const res = await api.get(`rit/report/upload-status/bank-wise/?rit_id=${rit}&fi_id=${fi}&date_from=${date_from}`, requestOptions(getState));
    dispatch({
      type: RIT_REPORT_DATA_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_REPORT_DATA_LOAD_ERROR
    });
  }
}

// LOAD Rit Non Reporting Bank Branch
export const loadRitNonReportingBranchByFI = (rit, fi, base_date) => async (dispatch, getState) => {

  try {
      const res = await api.get(`rit/report/upload-status/non-reporting-branch/?rit_id=${rit}&fi_id=${fi}&base_date=${base_date}`, requestOptions(getState));
    dispatch({
      type: RIT_REPORT_DATA_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_REPORT_DATA_LOAD_ERROR
    });
  }
}

// LOAD Rit Upload List
export const uploadRit = (form_data) => async (dispatch, getState) => {
  try {
      const res = await api.post('rit/upload/', form_data, requestFormOptions(getState));
    dispatch({
      type: RIT_UPLOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RIT_UPLOAD_ERROR
    });
  }
}