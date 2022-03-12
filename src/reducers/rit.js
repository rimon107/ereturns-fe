import {
  RIT_FREQUENCY_LOAD,
  RIT_FEATURE_LOAD,
  RIT_FEATURE_LOAD_ERROR,
  RIT_FREQUENCY_LOAD_ERROR,
  RIT_FEATURE_RESET,
  LOGOUT_SUCCESS,
  RIT_UPLOAD_LIST_LOAD,
  RIT_UPLOAD_LIST_LOAD_ERROR,
  RIT_DEFAULT_FILE_LOAD,
  RIT_DEFAULT_FILE_LOAD_ERROR,
  RIT_DEPARTMENT_LOAD,
  RIT_DEPARTMENT_LOAD_ERROR,
  RIT_DEPARTMENT_FILES_LOAD,
  RIT_DEPARTMENT_FILES_LOAD_ERROR,
  RIT_DEPARTMENT_FILES_RESET,
  RIT_REPORT_DATA_LOAD,
  RIT_REPORT_DATA_RESET,
  RIT_REPORT_DATA_LOAD_ERROR,
  RIT_UPLOADED,
  RIT_UPLOAD_ERROR,
  RIT_FILE_LOAD,
  RIT_FILE_LOAD_ERROR,
  RIT_VALIDATION_LOAD,
  RIT_VALIDATION_LOAD_ERROR,
  RIT_UPLOAD_RESET,
  RIT_FILE_RESET,
  RIT_VALIDATION_RESET,
} from "../actiontypes";

const initialState = {
  frequency: null,
  features: null,
  upload_list: null,
  departments: null,
  default_files: null,
  department_files: null,
  selected_rit: null,
  rits: null,
  report_data: null,
  uploaded_rit: null,
  validation_data: null,
};

export const ritReducer = (state = initialState, action) => {
  switch (action.type) {
    case RIT_FREQUENCY_LOAD:
      return {
        ...state,
        frequency: action.payload,
      };
    case RIT_FEATURE_LOAD:
      return {
        ...state,
        features: action.payload,
      };
    case RIT_UPLOAD_LIST_LOAD:
      return {
        ...state,
        upload_list: action.payload,
      };
    case RIT_UPLOADED:
      return {
        ...state,
        uploaded_rit: action.payload,
      };
    case RIT_UPLOAD_RESET:
      return {
        ...state,
        uploaded_rit: null,
      };
    case RIT_UPLOAD_ERROR:
      const data = {
        status: 0,
      };
      return {
        ...state,
        uploaded_rit: data,
      };
    case RIT_DEFAULT_FILE_LOAD:
      return {
        ...state,
        default_files: action.payload,
      };
    case RIT_DEFAULT_FILE_LOAD_ERROR:
      return {
        ...state,
        default_files: null,
      };
    case RIT_DEPARTMENT_LOAD:
      return {
        ...state,
        departments: action.payload,
      };
    case RIT_DEPARTMENT_LOAD_ERROR:
      return {
        ...state,
        departments: null,
      };
    case RIT_FILE_LOAD:
      return {
        ...state,
        selected_rit: action.payload,
      };
    case RIT_FILE_RESET:
    case RIT_FILE_LOAD_ERROR:
      return {
        ...state,
        selected_rit: null,
      };
    case RIT_DEPARTMENT_FILES_LOAD:
      return {
        ...state,
        department_files: action.payload,
      };
    case RIT_DEPARTMENT_FILES_RESET:
    case RIT_DEPARTMENT_FILES_LOAD_ERROR:
      return {
        ...state,
        department_files: null,
      };
    case RIT_FEATURE_RESET:
    case RIT_FEATURE_LOAD_ERROR:
      return {
        ...state,
        features: null,
      };
    case RIT_REPORT_DATA_LOAD:
      return {
        ...state,
        report_data: action.payload,
      };
    case RIT_REPORT_DATA_RESET:
    case RIT_REPORT_DATA_LOAD_ERROR:
      return {
        ...state,
        report_data: null,
      };
    case RIT_UPLOAD_LIST_LOAD_ERROR:
      return {
        ...state,
        upload_list: null,
      };
    case RIT_FREQUENCY_LOAD_ERROR:
      return {
        ...state,
        frequency: null,
      };
    case RIT_VALIDATION_LOAD:
      return {
        ...state,
        validation_data: action.payload,
      };
    case RIT_VALIDATION_RESET:
    case RIT_VALIDATION_LOAD_ERROR:
      return {
        ...state,
        validation_data: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        frequency: null,
        features: null,
        upload_list: null,
        departments: null,
        default_files: null,
        department_files: null,
        selected_rit: null,
        rits: null,
        report_data: null,
        validation_data: null,
      };
    default:
      return state;
  }
};
