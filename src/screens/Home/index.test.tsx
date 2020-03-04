import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Home from './index';

describe('Home screen', () => {
  const mockStore = configureStore([])

  // first render without authentication
  it('should render success with __isAuthenticated: false__ on initial', () => {
    const initState = {
      authenticate: { isAuthenticated: false }
    }
    const store = mockStore(initState)
    const wrapper = shallow(<Home store={store} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('isAuthenticated')).toEqual(false)
    expect(wrapper.dive().find('h1').text()).toBe('CodeNote');
  });

  // dispatch action authenticate
  it('should recieve props __isAuthenticated: true__ when dispatch authenticate', () => {
    const initState = {
      authenticate: { isAuthenticated: true }
    }
    const store = mockStore(initState)
    const wrapper = shallow(<Home store={store} />);

    expect(wrapper.prop('isAuthenticated')).toEqual(true)
    expect(wrapper.dive().find('.notes')).toHaveLength(1);
  });
});