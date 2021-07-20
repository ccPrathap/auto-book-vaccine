import slotReducer from '../../reducers/slotReducer';

test('slotReducer with default', () => {
  expect(slotReducer()).toEqual({
    isLoading: false,
    errorMsg: "",
    data: []
  });
});

test('slotReducer with request', () => {
  expect(slotReducer(undefined, { type: "FETCH_SLOTS_REQUEST" })).toEqual({
    isLoading: true,
    errorMsg: "",
    data: []
  });
});