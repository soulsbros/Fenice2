import { combineReducers } from 'redux';
import alignmentReducer from './alignmentReducer';
import generalReducer from './generalReducer';
import userReducer from './userReducer';
import trackerReducer from './trackerReducer';

const rootReducer = combineReducers({
  generalReducer,
  userReducer,
  alignmentReducer,
  trackerReducer,
});

export default rootReducer;
