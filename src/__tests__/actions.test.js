import { fetchSlots, updateSubOrg } from '../actions';
import { UPDATE_SUB_ORG } from '../constants';

test('updateSubOrg action', () => {
  const payload = { pincode: '560068' };
  expect(updateSubOrg(payload)).toEqual({
    type: UPDATE_SUB_ORG,
    payload,
  });
});

test('fetchSlots with data', async () => {
  const dispatch = jest.fn();
  const data = [{ test: 1234 }];
  const payload = { pincode: '560068', date: '20-07-2021' };
  jest.spyOn(global, 'fetch').mockImplementation(() => ({
    json: () => data
  }));
  await fetchSlots(payload)(dispatch);
  expect(dispatch).toBeCalledTimes(2);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: "FETCH_SLOTS_REQUEST"
  });
  expect(dispatch).toHaveBeenLastCalledWith({
    type: "FETCH_SLOTS_SUCCESS",
    payload: data,
  });
});

test('fetchSlots with failure', async () => {
  const dispatch = jest.fn();
  const errorMsg = 'Something went wrong';
  const payload = { pincode: '560068', date: '20-07-2021' };
  jest.spyOn(global, 'fetch').mockImplementation(
    () => Promise.reject(new Error(errorMsg))
  );
  await fetchSlots(payload)(dispatch);
  expect(dispatch).toBeCalledTimes(2);
  expect(dispatch).toHaveBeenNthCalledWith(1, {
    type: "FETCH_SLOTS_REQUEST"
  });
  expect(dispatch).toHaveBeenLastCalledWith({
    type: "FETCH_SLOTS_FAILURE",
    errorMsg,
  });
});