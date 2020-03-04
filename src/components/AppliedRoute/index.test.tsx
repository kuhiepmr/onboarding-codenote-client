import { mount, shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Home from '../../screens/Home/index';
import AppliedRoute from './index';

test('renders without crashing', () => {
  const initState = {
    authenticate: { isAuthenticated: false }
  }
  const store = configureStore([])(initState)
  const home = mount(<Home store={store} />);
  const wrapper = shallow(<AppliedRoute component={home} />);

  expect(wrapper).toMatchSnapshot();
});