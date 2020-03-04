import { shallow } from 'enzyme';
import { History } from 'history';
import React from 'react';
import { userHasAuthenticated } from '../../actions/authenticate';
import SignUp from './index';

describe('SignUp screen', () => {
  let wrapper, instance
  const props = {
    history: {} as History,
    userHasAuthenticated: userHasAuthenticated
  }

  beforeEach(() => {
    wrapper = shallow(<SignUp {...props} />);
    instance = wrapper.instance();
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
    const confirmPasswordEvent = {
      target: {
        id: 'confirmPassword',
        value: "123456"
      }
    }

    instance.handleChange(emailEvent);
    instance.handleChange(passwordEvent);
    instance.handleChange(confirmPasswordEvent);

    expect(wrapper.state().newUser).toBe(null);
    expect(wrapper.state().email).toEqual('admin@example.com');
    expect(wrapper.state().password).toEqual('123456');
    expect(wrapper.state().confirmPassword).toEqual('123456');
    expect(instance.validateForm()).toBe(true);
  });

  it('should validate confirmation', () => {
    const confirmEvent = {
      target: {
        id: 'confirmationCode',
        value: "123456"
      }
    }

    // confirmationCode is empty
    expect(wrapper.instance().validateConfirmationForm()).toBe(false);

    // fill confirmationCode
    instance.handleChange(confirmEvent);

    // should be true
    expect(instance.validateConfirmationForm()).toBe(true);
  });

  it('should update the state when submit', () => {
    instance.handleSubmit({ preventDefault: () => { } });
    expect(wrapper.state().newUser).toBe(null);
  });

  test('should show confirmation dialog', () => {
    wrapper.setState({
      newUser: {
        email: 'test@gmail.com',
        password: '123456'
      }
    });
    expect(wrapper.find('HelpBlock').dive().text()).toEqual('Please check your email for the code.')
  });
});