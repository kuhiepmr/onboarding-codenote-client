import { actionTypes } from '../actions/authenticate';
import authenticate, { IActions } from './authenticate';

describe('authenticate -- Reducer', () => {
  const initState = {
    isAuthenticated: false
  }

  it('should return initial state on empty action', () => {
    const action = {} as IActions

    expect(authenticate(initState, action)).toEqual(initState)
  })

  it('should return authenticated', () => {
    const action = {
      type: actionTypes.LOGIN_SUCCESS,
      payload: true,
    }
    const expectedState = {
      isAuthenticated: true
    }

    expect(authenticate(initState, action)).toEqual(expectedState)
  })
});


