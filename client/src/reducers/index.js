import { combineReducers } from 'redux';
import generalReducer from './generalReducer';

const rootReducer = combineReducers({
  generalReducer,
});

export default rootReducer;
