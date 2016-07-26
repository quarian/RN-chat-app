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
var getChatHistory = require('./getChatHistory');
var setUpWebsocket = require('./setUpWebsocket');

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRows: [],
      showLoading: true,
      ws: null,
      scrollViewHeight: 0,
      scrollContentHeight: 0
    };
  }

  populateChatHistory(response, context) {
    context.setState({showLoading: false});
    response = JSON.parse(response);
    for (var i = 0; i < response.length; i++) {
      context.addRow(response[i][1],
        response[i][0] == 'Champ');
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      getChatHistory(this.props.title, this.populateChatHistory, this);
      setUpWebsocket(this);
    });
  }

  componentWillUnmount() {
    this.state.ws.close();
  }

  addRow(message, me) {
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

  scrollToBottom() {
    console.log(this.scrollContentHeight)
    console.log(this.scrollViewHeight)
    this.refs.chatScrollView.scrollTo(
      {y: this.scrollContentHeight - this.scrollViewHeight, animated: true}
    )
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
        <ScrollView ref="chatScrollView" style={styles.chatMessages}
          onContentSizeChange={(width, height) => {
              this.scrollContentHeight = height
              this.scrollToBottom()
          }}
          onLayout={event => this.scrollViewHeight = event.nativeEvent.layout.height}
          >
          {this.state.chatRows}
        </ScrollView>
        <View style={styles.separator}/>
        <ChatInput style={styles.chatInput} parent={this}/>
      </View>
    )
  };
}

module.exports = ChatView;