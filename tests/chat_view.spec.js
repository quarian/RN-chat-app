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

// Currently, the react-native-mock library does not mock a function that
// is used by the CameraRoll (groupByEveryN) - so trying to import and work
// with that will cause this to explode. Put that to the TODO list
//import ChatInput from '../ChatView';

describe('<ChatView/>', () => {

  it('should render an empty chat view', () => {
    const wrapper = shallow(
    //  <ChatView />
    );

    //expect(wrapper.find(TextInput)).to.have.lengthOf(1);
  });
});
