import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var ChatView = require('./ChatView');

class Thumb extends Component {
  _onPressButton(props) {
    props.navigator.push({
      name: 'Chat View',
      component: ChatView,
      passProps: {title: props.name}
    })
  };

  render() {
    return (
      <View style={styles.chatListElement}>
        <TouchableHighlight onPress={() => this._onPressButton(this.props)}>
          <Text style={styles.friendContainer}>
            {this.props.name}
          </Text>
        </TouchableHighlight>
        <View style={styles.chatListSeparator}/>
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

module.exports = Thumb;
