import { connect } from 'react-redux';
import VaccineForm from './VaccineForm';
import { updateOrg, updateSubOrg } from './actions';

export default connect(store => ({
  org: store.subOrgReducer.org,
  subOrg: store.subOrgReducer.subOrg,
}), {
  updateOrg,
  updateSubOrg
})(VaccineForm);