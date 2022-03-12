import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../store';
import { REFRESH_TOKEN, LOGOUT_SUCCESS } from '../actiontypes';
import {requestOptions} from './authHeader';


const api = axios.create({
  baseURL: 'http://10.41.230.83:8000/api/v1',
  // baseURL: 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    
    if (error?.response==null) {
      console.log("service unavailable.")
    }
    else if (error?.response?.status === 401) {
      store.dispatch({ type: LOGOUT_SUCCESS });
    }

    return error;
  }
);

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

// Function that will be called to refresh authorization
const body = {
  refresh: store.getState().auth.refresh
};

// console.log(body);

const refreshAuthLogic = failedRequest => api.post('auth/token/refresh/', body, requestOptions(store.getState))
    .then((tokenRefreshResponse) => {
      store.dispatch({ type: REFRESH_TOKEN });
      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
      return Promise.resolve();
    })
    


// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(api, refreshAuthLogic);



// api.interceptors.response.use(response => {
//   return response;
// }, error => {
//   console.log(error);
//   if (error?.response?.status === 401) {
//     store.dispatch({ type: LOGOUT_SUCCESS });
//   }
//   return error;
// });

export default api;
