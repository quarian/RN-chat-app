import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

var styles = require('./Styles');

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  postChatMessage(text, parent) {
    parent._addRow(this.state.text, true);
    parent.state.ws.send(this.state.text);
    fetch('https://elegant-saucisson-63110.herokuapp.com/quote', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
              name1: 'Champ',
              name2: parent.props.title,
              message: this.state.text
        })
      })
      .then((response) => response.text())
      .then((responseText) => parent._addRow(responseText, false))
      .catch((error) => console.warn(error))
    this.setState({text: ''});
  }

  render() {
    return(
      <TextInput
        style={styles.chatInput}
        returnKeyType='done'
        placeholder="Write your messages here"
        onChangeText={(text) => this.setState({text})}
        onSubmitEditing={(text) =>
          this.postChatMessage(text, this.props.parent)}
        value={this.state.text}
      />
    )
  };
}

module.exports = ChatInput;
