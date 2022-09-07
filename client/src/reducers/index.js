import { combineReducers } from 'redux';
import alignmentReducer from './alignmentReducer';
import charactersReducer from './charactersReducer';
import generalReducer from './generalReducer';
import trackerReducer from './trackerReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  generalReducer,
  userReducer,
  alignmentReducer,
  trackerReducer,
  charactersReducer,
});

export default rootReducer;
