import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
  StatusBar
} from 'react-native';

var Thumb = require('./Thumb');
var styles = require('./Styles');
var getChats = require('./getChats')

class ChatListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userJson: [],
      friends: [],
      showLoading: true
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      getChats(this.handleChats, this)
    });
  }

  handleChats(context, json) {
    context.setState({showLoading: false})
    context.setState({userJson: json})
    context.populateFriends()
  }

  populateFriends() {
    for (var i = 1; i < this.state.userJson.length; i++) {
      this.state.friends.push(
        <Thumb name={this.state.userJson[i]} key={this.state.friends.length} navigator={this.props.navigator}/>)
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
