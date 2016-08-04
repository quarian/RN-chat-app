import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var ChatView = require('./ChatView');
var styles = require('./Styles');

class ChatEntry extends Component {
  onPressButton(props) {
    props.navigator.push({
      name: 'Chat View',
      component: ChatView,
      passProps: {title: props.name}
    })
  };

  render() {
    return (
      <View style={styles.chatListElement}>
        <TouchableHighlight onPress={() => this.onPressButton(this.props)}>
          <Text style={styles.friendContainer}>
            {this.props.name}
          </Text>
        </TouchableHighlight>
        <View style={styles.chatListSeparator}/>
      </View>
    )
  };
}

module.exports = ChatEntry;
