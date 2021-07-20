const initialState = {
  isLoading: false,
  errorMsg: "",
  data: []
};

const myReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "FETCH_SLOTS_REQUEST":
      return { ...state, isLoading: true, errorMsg: "" };
    case "FETCH_SLOTS_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_SLOTS_FAILURE":
      return { ...state, isLoading: false, errorMsg: action.errorMsg };
    default:
      return state;
  }
}

export default myReducer;