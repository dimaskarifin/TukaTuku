import {combineReducers} from 'redux';
import RajaOngkirReducer from './rajaongkir';
import UserReducer from './user';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  RajaOngkirReducer,
  UserReducer,
  AuthReducer,
});

export default rootReducer;
