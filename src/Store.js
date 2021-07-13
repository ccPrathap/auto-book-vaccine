import { combineReducers, createStore } from 'redux';
import subOrgReducer from './subOrgReducer';

export const store = createStore(combineReducers({
  subOrgReducer,
}));
