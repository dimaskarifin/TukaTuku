import {combineReducers} from 'redux';
import RajaOngkirReducer from './rajaongkir';
import UserReducer from './user';
import AuthReducer from './auth';
import ProfileReducer from './profile';
import CatHoodieReducer from './cathoodie';
import HoodieReducer from './hoodie';
import KeranjangReducer from './keranjang';
import PaymentReducer from './payment';
import PesananReducer from './pesanan';

const rootReducer = combineReducers({
  RajaOngkirReducer,
  UserReducer,
  AuthReducer,
  ProfileReducer,
  CatHoodieReducer,
  HoodieReducer,
  KeranjangReducer,
  PaymentReducer,
  PesananReducer,
});

export default rootReducer;
