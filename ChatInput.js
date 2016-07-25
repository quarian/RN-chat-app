import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

var styles = require('./Styles');
var getQuote = require('./getQuote');

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  postChatMessage(text, parent) {
    parent.addRow(this.state.text, true);
    parent.state.ws.send(this.state.text);
    getQuote(parent.props.title, this.state.text, this.postQuote, parent);
    this.setState({text: ''});
  }

  postQuote(quote, parent) {
    parent.addRow(quote);
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
