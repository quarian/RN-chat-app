import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
} from 'react-native';

var ChatInput = require('./ChatInput');
var styles = require('./Styles');

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRows: [],
      showLoading: true,
      ws: null
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getChatHistory();
      this.setState({ws: new WebSocket('ws://elegant-saucisson-63110.herokuapp.com/ws')});
      var ws = this.state.ws;
      ws.onopen = () => {
        // connection opened
        console.log("Whee")
        ws.send("Champ " + this.props.title)
      };

      ws.onmessage = (e) => {
        // a message was received
        this._addRow(e.data, false);
        console.log(e.data);
      };

      ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
      };

      ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
      };
    });
  }

  componentWillUnmount() {
    this.state.ws.close();
  }

  getChatHistory() {
    fetch('https://elegant-saucisson-63110.herokuapp.com/chat', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
              name1: 'Champ',
              name2: this.props.title
        })
      })
      .then((response) => response.text())
      .then((responseText) => this.populateChatHistory(responseText))
      .catch((error) => console.warn(error))
  }

  populateChatHistory(response) {
    historyJson = JSON.parse(response);
    this.setState({showLoading: false});
    for (var i = 0; i < historyJson.length; i++) {
      this._addRow(historyJson[i][1],
        historyJson[i][0] == 'Champ');
    }
  }

  _addRow(message, me) {
    if (me) {
      this.state.chatRows.push(
        <View key={this.state.chatRows.length} style={styles.myMessageRow}>
          <View style={styles.myMessageBox}>
            <Text style={styles.myMessage}>{message}</Text>
          </View>
        </View>
      );
    } else {
      this.state.chatRows.push(
        <View key={this.state.chatRows.length} style={styles.friendMessageRow}>
          <View style={styles.friendMessageBox}>
            <Text style={styles.friendMessage}>{message}</Text>
          </View>
        </View>
      );
    }
    this.setState({chatRows: this.state.chatRows});
    return message
  }

  goBack(props) {
    props.navigator.pop();
  }

  render() {
    var loading = !this.state.showLoading ? null :
      <View ref="loading" style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading chat history...</Text>
      </View>;
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatTitleContainer}>
          <Text style={styles.chatBackButton} onPress={() => this.goBack(this.props)}>Back</Text>
          <Text style={styles.chatTitle}>{this.props.title}</Text>
        </View>
        <View style={styles.chatListSeparator}/>
        {loading}
        <ScrollView ref="_chatScrollView" style={styles.chatMessages}
          onContentSizeChange={(width, height)=>{
              this.refs._chatScrollView.scrollTo({x:0, y:height, animated:true})
          }}>
          {this.state.chatRows}
        </ScrollView>
        <View style={styles.separator}/>
        <ChatInput style={styles.chatInput} parent={this}/>
      </View>
    )
  };
}

module.exports = ChatView;
