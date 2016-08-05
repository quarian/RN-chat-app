import sinon from 'sinon';
import React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
  StatusBar,
  groupByEveryN
} from 'react-native';
import {shallow} from 'enzyme';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import {hasStyles} from '../test/assertions';

import ChatView from '../ChatView';
import ChatInput from '../ChatInput'

describe('<ChatView/>', () => {

  it('should render an empty chat view with loading message', () => {
    const wrapper = shallow(
      <ChatView title={"Friend"}/>
    );

    expect(wrapper.find(ChatInput)).to.have.lengthOf(1);
    expect(wrapper.find(ScrollView)).to.have.lengthOf(1);
    expect(wrapper.find(Text)).to.have.lengthOf(3);
    expect(wrapper.props().title).to.be.defined;
    expect(wrapper.state().showLoading).to.equal(true);
    expect(wrapper.state().chatRows).to.be.empty;
  });

  it('should render a chat view with 3 rows of messages', () => {
    const wrapper = shallow(
      <ChatView title={"Friend"}/>
    );
    wrapper.setState({showLoading: false});
    wrapper.setState({chatRows: ["message1", "message2", "message3"]})
    expect(wrapper.find(ChatInput)).to.have.lengthOf(1);
    expect(wrapper.find(ScrollView)).to.have.lengthOf(1);
    expect(wrapper.find(Text)).to.have.lengthOf(2);
    expect(wrapper.props().title).to.be.defined;
    expect(wrapper.state().showLoading).to.equal(false);
    expect(wrapper.state().chatRows).to.have.length(3);
  });

  // Throws around warnings about setState(), but it is to be expected
  it('tests row addition functions', () => {
    var chatView = new ChatView();
    chatView.addRow("Message1", true);
    chatView.addRow("Message2", false);
    expect(chatView.state.chatRows).to.have.lengthOf(2);
  });

});
