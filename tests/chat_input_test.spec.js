import sinon from 'sinon';
import React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
  StatusBar
} from 'react-native';
import {shallow} from 'enzyme';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import {hasStyles} from '../test/assertions';

import ChatInput from '../ChatInput';

describe('<ChatInput/>', () => {

  it('should render the basic chatinput with empty input', () => {
    const wrapper = shallow(
      <ChatInput />
    );

    expect(wrapper.find(TextInput)).to.have.lengthOf(1);
    expect(wrapper.state().text).to.equal('');
  });
});
