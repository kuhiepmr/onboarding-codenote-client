import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { actionTypes, userHasAuthenticated } from '../../actions/authenticate';
import Login from './index';

describe('Login screen', () => {
  const mockStore = configureStore([])
  const initState = {
    authenticate: { isAuthenticated: false }
  }
  let wrapper, instance, dive, store

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(<Login store={store} />);
    dive = wrapper.dive()
    instance = dive.instance();
  });

  it('should render success', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change field and validate', () => {
    const emailEvent = {
      target: {
        id: 'email',
        value: "admin@example.com"
      }
    }
    const passwordEvent = {
      target: {
        id: 'password',
        value: "123456"
      }
    }

    instance.handleChange(emailEvent);
    instance.handleChange(passwordEvent);

    expect(dive.state().email).toEqual('admin@example.com');
    expect(dive.state().password).toEqual('123456');
    expect(instance.validateForm()).toBe(true);
  });

  it('should loading when submit', () => {
    instance.handleSubmit({ preventDefault: () => { } })
    expect(dive.state().isLoading).toBe(true);
  });

  it('should recieve expected action', () => {
    const expectedActions = [{
      type: actionTypes.LOGIN_SUCCESS,
      payload: true,
    }]
    store.dispatch(userHasAuthenticated(true))

    expect(store.getActions()).toEqual(expectedActions)
  });
});