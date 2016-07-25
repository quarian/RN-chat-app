import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  InteractionManager,
} from 'react-native';

var Thumb = require('./Thumb');
var styles = require('./Styles');

class ChatListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userJson: [],
      friends: []
    }
    this.getChats()
  }

  getChats() {
    fetch('https://elegant-saucisson-63110.herokuapp.com/db')
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({userJson: JSON.parse(responseText)})
        this.populateFriends()
      })
      .catch((error) => console.warn(error))
  }

  populateFriends() {
    for (var i = 1; i < this.state.userJson.length; i++) {
      this.state.friends.push(
        <Thumb name={this.state.userJson[i]} key={this.state.friends.length} navigator={this.props.navigator}/>)
    }
    this.setState({friends: this.state.friends})
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>Elegant Chat</Text>
        <View style={styles.chatListSeparator}/>
        <ScrollView>
          {this.state.friends}
        </ScrollView>
      </View>
    )
  };
}

module.exports = ChatListView;
