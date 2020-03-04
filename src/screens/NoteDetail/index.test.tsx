import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import NoteDetail from './index';
import { History } from 'history';
import { API, Storage } from "aws-amplify";

describe('NoteDetail screen', () => {
  let wrapper, instance
  const props = {
    match: {
      params: {
        id: '1'
      }
    },
    history: {} as History,
  }

  beforeEach(() => {
    wrapper = shallow(<NoteDetail {...props} />);
    instance = wrapper.instance();
  });

  it('should render success', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should get note success', () => {
    const note = {
      noteId: '1',
      content: 'content',
      attachment: 'file',
      createdAt: '1/1/1970',
    }

    API.get = jest.fn().mockImplementation(() => {
      return note
    });

    const res = instance.getNote();
    expect(res).toEqual(note);

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
    expect(instance.validateForm()).toBe(true);
    expect(instance.file).toEqual(fileEvent.target.files[0]);
    expect(instance.formatFilename('test')).toBe('test')
  });

  it('should save note', () => {
    const note = {
      noteId: '1',
      content: 'test',
      attachment: 'file',
    }

    API.put = jest.fn().mockImplementation(() => {
      return note
    });

    const res = instance.saveNote(note);
    expect(res).toEqual(note);
  });


  it('should delete and change state', () => {
    instance.handleDelete({ preventDefault: () => { } });
    expect(wrapper.state().isDeleting).toBe(false);

    API.del = jest.fn().mockImplementation(() => {
      return true
    });

    const res = instance.deleteNote();
    expect(res).toEqual(true);
  });
});