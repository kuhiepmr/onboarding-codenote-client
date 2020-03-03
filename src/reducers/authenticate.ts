import { types } from "../actions/authenticate";

const initialState = {
  isAuthenticated: false
};

export default function authenticate(state = initialState, action) {
  switch (action.type) {
    case types.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
}
