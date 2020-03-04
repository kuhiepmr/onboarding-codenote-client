import { mount, shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Login from '../../screens/Login/index';
import UnauthenticatedRoute from './index';

test('renders without crashing', () => {
  const initState = {
    authenticate: { isAuthenticated: true }
  }
  const store = configureStore([])(initState)
  const login = mount(<Login store={store} />);
  const wrapper = shallow(<UnauthenticatedRoute store={store} component={login} />);

  expect(wrapper).toMatchSnapshot();
});