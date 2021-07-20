import { UPDATE_SUB_ORG } from '../constants';

const initialState = {
  org: "MyOrgFromReducer",
  subOrg: "Tech support US/India"
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ORG":
      return { ...state, org: action.payload };
    case UPDATE_SUB_ORG:
      return { ...state, subOrg: action.payload };
    default:
      return state;
  }
}

export default myReducer;