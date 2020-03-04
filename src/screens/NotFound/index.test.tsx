import { shallow } from 'enzyme';
import React from "react";
import NotFound from './index';

test('renders without crashing', () => {
  const wrapper = shallow(<NotFound />);

  expect(wrapper).toMatchSnapshot();
});