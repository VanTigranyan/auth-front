import axiosInst from '../_helpers/axios-helper';

import {
  REQUEST_USER_PENDING,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILURE
} from "../constants";


export const reqUserAction = () => dispatch => {
  dispatch({ type: REQUEST_USER_PENDING });
  axiosInst.get("/current")
  .then(res => dispatch({
    type: REQUEST_USER_SUCCESS,
    payload: res.data
  }))
  .catch(error => dispatch({
    type: REQUEST_USER_FAILURE,
    payload: error
  }))
}
