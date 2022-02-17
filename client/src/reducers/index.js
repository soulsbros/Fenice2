import { combineReducers } from 'redux';
import generalReducer from './generalReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  generalReducer,
  userReducer,
});

export default rootReducer;
