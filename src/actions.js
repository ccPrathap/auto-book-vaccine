import { DateTime } from 'luxon';
import { UPDATE_SUB_ORG } from './constants';

export const updateSubOrg = payload => ({
  type: UPDATE_SUB_ORG,
  payload,
});

export const updateOrg = payload => ({
  type: "UPDATE_ORG",
  payload,
});

export const fetchSlotsRequest = () => ({
  type: "FETCH_SLOTS_REQUEST"
});

export const fetchSlotsSuccess = payload => ({
  type: "FETCH_SLOTS_SUCCESS",
  payload,
});

export const fetchSlotsFailure = errorMsg => ({
  type: "FETCH_SLOTS_FAILURE",
  errorMsg,
});

export const fetchSlots = payload => {
  return async dispatch => {
    try {
      dispatch(fetchSlotsRequest());
      const { date, pincode } = payload;
      const res = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${DateTime.fromSQL(date).toFormat("dd-MM-yyyy")}`);
      const data = await res.json();
      dispatch(fetchSlotsSuccess(data));
    } catch (error) {
      dispatch(fetchSlotsFailure(error.message));
    }
  }
};