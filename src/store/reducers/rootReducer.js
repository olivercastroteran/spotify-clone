import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { musicReducer } from './musicReducer';
import { infoReducer } from './infoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  music: musicReducer,
  info: infoReducer,
});

export default rootReducer;
