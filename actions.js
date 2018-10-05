import {
  REQUEST_AUTH_PENDING,
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAILURE
}
   from './constants';
export const requestAuthAction = (dispatch) => {
  dispatch({type: REQUEST_AUTH_PENDING})
}
