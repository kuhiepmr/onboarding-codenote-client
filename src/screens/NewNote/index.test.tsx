import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import NewNote from './index';
import { History } from 'history';

describe('NewNote screen', () => {
  let wrapper, instance
  const props = {
    history: {} as History
  }

  beforeEach(() => {

    wrapper = shallow(<NewNote {...props} />);
    instance = wrapper.instance();
  });

  it('should render success', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change field and validate', () => {
    const contentEvent = {
      target: {
        id: 'content',
        value: "test"
      }
    }

    const fileEvent = {
      target: {
        files: [
          'test'
        ]
      }
    }

    instance.handleChange(contentEvent);
    instance.handleFileChange(fileEvent);

    expect(wrapper.state().content).toEqual('test');
    expect(instance.file).toEqual(fileEvent.target.files[0]);
    expect(instance.validateForm()).toBe(true);
  });


  it('should loading when submit', () => {
    instance.handleSubmit({ preventDefault: () => { } })
    expect(wrapper.state().isLoading).toBe(true);
  });
});