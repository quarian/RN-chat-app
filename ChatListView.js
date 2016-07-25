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

var backgroundColor = '#DCD0C0';
var titleBackgroundColor = '#373737';
var chatItemBackgroundColor = '#f4f4f4';
var fontColor = '#c0b283';

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    color:  backgroundColor,
    backgroundColor: titleBackgroundColor
  },
  chatTitleContainer: {
    flexDirection: 'row'
  },
  chatBackButton: {
      fontSize: 15,
      textAlign: 'center',
      textAlignVertical: 'center',
      color:  backgroundColor,
      padding: 12.5,
      backgroundColor: titleBackgroundColor,
      flex: 1
  },
  chatTitle: {
    fontSize: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
    color:  backgroundColor,
    padding: 10,
    backgroundColor: titleBackgroundColor,
    flex: 7
  },
  chatListElement: {
  },
  friendContainer: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    backgroundColor: chatItemBackgroundColor,
    color: fontColor
  },
  mainContainer: {
    backgroundColor: backgroundColor,
    flex: 1
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: backgroundColor,
    color: fontColor,
  },
  loadingContainer: {
    flex: 3,
    backgroundColor: backgroundColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatInput: {
    height: 50,
    borderColor: titleBackgroundColor,
    borderWidth: 1,
    backgroundColor: chatItemBackgroundColor,
    color: titleBackgroundColor
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  chatMessages: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
    padding: 5
  },
  myMessage: {
    textAlign: 'right',
    color: titleBackgroundColor
  },
  myMessageBox: {
    backgroundColor: chatItemBackgroundColor,
    padding: 5,
    borderRadius:5
  },
  myMessageRow: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: 2,
    marginLeft: 30
  },
  friendMessage: {
    textAlign: 'left',
    color: titleBackgroundColor
  },
  friendMessageBox: {
    backgroundColor: fontColor,
    padding: 5,
    borderRadius: 5
  },
  friendMessageRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 2,
    marginRight: 30,
  },
  separator: {
    backgroundColor: backgroundColor,
    height: 10
  },
  chatListSeparator: {
      backgroundColor: backgroundColor,
      height: 2
  },
});

module.exports = ChatListView;
