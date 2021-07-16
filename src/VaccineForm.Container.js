import { connect } from 'react-redux';
import VaccineForm from './VaccineForm';
import { fetchSlots, updateOrg, updateSubOrg } from './actions';

export default connect(store => ({
  org: store.subOrgReducer.org,
  subOrg: store.subOrgReducer.subOrg,
  isLoading: store.slot.isLoading,
  errorMsg: store.slot.errorMsg,
  data: store.slot.data,
}), {
  updateOrg,
  fetchSlots,
  updateSubOrg
})(VaccineForm);