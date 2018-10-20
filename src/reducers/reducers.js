import { combineReducers } from 'redux';
import {
  REQUEST_USER_PENDING,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILURE
}
   from '../constants';


 const requestUserInitState = {
   isPending: false,
   user: null,
   error: null
 }

 const requestUserReducer = (state = requestUserInitState, action = {}) => {
   switch (action.type) {
     case REQUEST_USER_PENDING:
      return {...state, isPending: true}
    case REQUEST_USER_SUCCESS:
    console.log('action.payload', action.payload);
      return {...state, isPending: false, user: action.payload}
    case REQUEST_USER_FAILURE:
      return {...state, isPending: false, error: action.payload}
    default:
      return state;
   }
 }


 const rootReducer = combineReducers({
   requestUserReducer
 })

 export default rootReducer;
