import { types } from "../actions/authenticate";

const initialState = {
  isAuthenticated: false
};

export default function authenticate(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, isAuthenticated: true };
    case types.LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}
