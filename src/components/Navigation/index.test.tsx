import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Navigation from './index';

describe('Navigation', () => {
  const mockStore = configureStore([])

  // first render without authentication
  it('should render success', () => {
    const initState = {
      authenticate: { isAuthenticated: false }
    }
    const store = mockStore(initState)
    const wrapper = shallow(<Navigation store={store} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('isAuthenticated')).toEqual(false)
  });

  // dispatch action authenticate
  it('should render success', () => {
    const initState = {
      authenticate: { isAuthenticated: true }
    }
    const store = mockStore(initState)
    const wrapper = shallow(<Navigation store={store} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('isAuthenticated')).toEqual(true)
  });
});