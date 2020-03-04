import { actionTypes, userHasAuthenticated } from '../actions/authenticate';

describe('authenticate -- Action', () => {
  it('should create action with passed data', () => {
    const expectedActions = {
      type: actionTypes.LOGIN_SUCCESS,
      payload: true,
    }

    expect(userHasAuthenticated(true)).toEqual(expectedActions)
  })
});


