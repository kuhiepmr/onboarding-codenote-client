import { shallow } from 'enzyme';
import React from 'react';
import LoaderButton from './index';

test('renders without crashing', () => {
  const props = {
    isLoading: true,
    loadingText: 'loading',
    text: 'button'
  };
  const wrapper = shallow(<LoaderButton {...props} />);

  expect(wrapper).toMatchSnapshot();
});

describe('LoaderButton', () => {
  it('should render loadingText', () => {
    const props = {
      isLoading: true,
      loadingText: 'loading',
      text: 'button'
    }
    const wrapper = shallow(<LoaderButton {...props} />);

    expect(wrapper.dive().find('button').text()).toBe('<Glyphicon />loading')
  });

  it('should render text', () => {
    const props = {
      isLoading: false,
      loadingText: 'loading',
      text: 'button'
    }
    const wrapper = shallow(<LoaderButton {...props} />);

    expect(wrapper.dive().find('button').text()).toBe('button')
  });

});