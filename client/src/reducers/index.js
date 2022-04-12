import { combineReducers } from 'redux';
import alignmentReducer from './alignmentReducer';
import generalReducer from './generalReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  generalReducer,
  userReducer,
  alignmentReducer,
});

export default rootReducer;
