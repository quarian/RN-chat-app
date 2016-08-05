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

import ChatListView from '../ChatListView';
import ChatEntry from '../ChatEntry';

describe('<ChatListView/>', () => {

  it('should render an empty chat list view with loading message', () => {
    const wrapper = shallow(
      <ChatListView />
    );
    expect(wrapper.find(Text)).to.have.lengthOf(2);
    expect(wrapper.state().showLoading).to.equal(true);
  });

  it('should render a chat list view with two friends', () => {
    const wrapper = shallow(
      <ChatListView />
    );
    wrapper.setState({friends: [<ChatEntry key={1}/>, <ChatEntry key={2}/>]});
    wrapper.setState({showLoading: false});
    expect(wrapper.state().showLoading).to.equal(false);
    expect(wrapper.find(Text)).to.have.lengthOf(1);
    expect(wrapper.find(ChatEntry)).to.have.lengthOf(2);
  });


  // This test will note that you are calling setState() from an umnounted
  // component, we are testing if the setState makes what we want it to do.
  it('should append friends with its functions', () => {
    var chatList = new ChatListView();
    chatList.props = {navigator : null};
    // populateFriends leaves out the first item on purpose
    chatList.populateFriends(JSON.parse('["Champ", "Friend1", "Friend2"]'));
    expect(chatList.state.friends).to.have.lengthOf(2);
  });
});
