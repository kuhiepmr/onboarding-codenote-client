import { mount, shallow } from 'enzyme';
import { History } from 'history';
import React from 'react';
import configureStore from 'redux-mock-store';
import NewNote from '../../screens/NewNote/index';
import AuthenticatedRoute from './index';

test('renders without crashing', () => {
  const initState = {
    authenticate: { isAuthenticated: true }
  }
  const props = {
    history: {} as History,
  }
  const store = configureStore([])(initState)
  const note = mount(<NewNote {...props} />);
  const wrapper = shallow(<AuthenticatedRoute store={store} component={note} />);

  expect(wrapper).toMatchSnapshot();
});