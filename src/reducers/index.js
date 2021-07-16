import { combineReducers } from 'redux';
import slot from './slotReducer';
import subOrgReducer from './subOrgReducer';

export default combineReducers({
  slot,
  subOrgReducer
});