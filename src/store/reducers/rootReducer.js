import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { musicReducer } from './musicReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  music: musicReducer,
});

export default rootReducer;
