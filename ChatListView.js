import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
  StatusBar
} from 'react-native';

var ChatEntry = require('./ChatEntry');
var styles = require('./Styles');
var getChats = require('./getChats')

class ChatListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      showLoading: true
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      getChats()
        .then((response) => response.json())
        .then((responseJson) => this.handleChats(responseJson))
        .catch((error) => console.warn(error))
    });
  }

  handleChats(json) {
    this.setState({showLoading: false})
    this.populateFriends(json)
  }

  populateFriends(json) {
    for (var i = 1; i < json.length; i++) {
      this.state.friends.push(
        <ChatEntry name={json[i]} key={this.state.friends.length} navigator={this.props.navigator}/>)
    }
    this.setState({friends: this.state.friends})
  }

  render() {
    var loading = !this.state.showLoading ? null :
      <View ref="loading" style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading friends list...</Text>
      </View>;
    return (
      <View style={styles.mainContainer}>
        <StatusBar hidden={true} />
        <Text style={styles.mainTitle}>Elegant Chat</Text>
        <View style={styles.chatListSeparator}/>
        {loading}
        <ScrollView>
          {this.state.friends}
        </ScrollView>
      </View>
    )
  };
}

module.exports = ChatListView;
