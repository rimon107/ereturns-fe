// Auth actiontypes
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Failure';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export const LOGOUT_FAIL = '[Auth] Logout Failure';
export const REFRESH_TOKEN = "[Auth] REFRESH_TOKEN";
export const AUTH_ERROR = '[Auth] Authentication Error';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAIL = '[Auth] Register Failure';

// User actiontypes
export const USER_LOADING = '[User] User Loading';
export const USER_LOADED = '[User] User Load Success';
export const USER_LOAD_ERROR = '[User] User Load Error';
export const MEMBER_COUNT = "[User] Member Count Load";
export const GET_PROFILE = "[User] Profile Load";
export const NO_PROFILE = "[User] Profile Not Found";
export const USER_LIST_LOAD = "[User] List Load";
export const USER_LIST_LOAD_ERROR = "[User] List Load Error";
export const USER_INACTIVE_LIST_LOAD = "[User] Inactive List Load";
export const USER_INACTIVE_LIST_LOAD_ERROR = "[User] Inactive List Load Error";

// Core actiontypes
export const SET = '[Core] set';

// RIT actiontypes
export const RIT_FREQUENCY_LOAD = "[RIT] Frequency Load";
export const RIT_FREQUENCY_LOAD_ERROR = "[RIT] Frequency Load Error";

export const RIT_FEATURE_LOAD = "[RIT] Feature Load";
export const RIT_FEATURE_RESET = "[RIT] Feature Reset";
export const RIT_FEATURE_LOAD_ERROR = "[RIT] Feature Load Error";

export const RIT_UPLOAD_LIST_LOAD = "[RIT] Upload List Load";
export const RIT_UPLOAD_LIST_LOAD_ERROR = "[RIT] Upload List Load Error";

export const RIT_DEFAULT_FILE_LOAD = '[RIT] Default File Load';
export const RIT_DEFAULT_FILE_LOAD_ERROR = '[RIT] Default File Load Error';

export const RIT_DEPARTMENT_LOAD = '[RIT] Department Load';
export const RIT_DEPARTMENT_LOAD_ERROR = '[RIT] Department Load Error';

export const RIT_DEPARTMENT_FILES_LOAD = '[RIT] Department Files Load';
export const RIT_DEPARTMENT_FILES_RESET = '[RIT] Department Files Reset';
export const RIT_DEPARTMENT_FILES_LOAD_ERROR = '[RIT] Department Files Load Error';

export const RIT_REPORT_DATA_LOAD = '[RIT] Report Data Load';
export const RIT_REPORT_DATA_RESET = '[RIT] Report Data Reset';
export const RIT_REPORT_DATA_LOAD_ERROR = '[RIT] Report Data Load Error';

export const RIT_UPLOADED = '[RIT] Upload Success';
export const RIT_UPLOAD_ERROR = '[RIT] Upload Error';

// Institute actiontypes
export const FINANCIAL_INSTITUTE_LOAD = '[Institute] Financial Institute Load';
export const FINANCIAL_INSTITUTE_LOAD_ERROR = '[Institute] Financial Institute Load Error';
export const BRANCH_LOAD = '[Institute] Branch Load';
export const BRANCH_LOAD_ERROR = '[Institute] Branch Load Error';
export const FINANCIAL_INSTITUTE_USER_COUNT_LOAD = '[Institute] Financial Institute User Count Load';
export const FINANCIAL_INSTITUTE_USER_COUNT_LOAD_ERROR = '[Institute] Financial Institute User Count Load Error';
