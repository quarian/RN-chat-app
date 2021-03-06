import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
  Image,
  Platform
} from 'react-native';

var ChatInput = require('./ChatInput');
var styles = require('./Styles');
var getChatHistory = require('./getChatHistory');
var setUpWebsocket = require('./setUpWebsocket');
var ImageSelection = require('./ImageSelection');

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

  populateChatHistory(response) {
    this.setState({showLoading: false});
    for (var i = 0; i < response.length; i++) {
      this.addRow(response[i][1],
        response[i][0] == 'Champ');
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      getChatHistory(this.props.title)
        .then((response) => response.json())
        .then((responseJson) => this.populateChatHistory(responseJson))
        .catch((error) => console.warn(error))
      setUpWebsocket(this);
    });
  }

  componentWillUnmount() {
    this.state.ws.close();
  }

  addRow(message, me) {
    if (me)
      this.addMyMessage(message);
    else
      this.addFriendMessage(message);
    this.setState({chatRows: this.state.chatRows});
    return message
  }

  addMyMessage(message) {
    if (message.indexOf("__IMAGE__") < 0) {
      this.state.chatRows.push(
        <View key={this.state.chatRows.length} style={styles.myMessageRow}>
          <View style={styles.myMessageBox}>
            <Text style={styles.myMessage}>{message}</Text>
          </View>
        </View>
      );
    } else if (Platform.OS === 'android'){
      this.postImage(message.slice(message.indexOf("content")));
    }
  }

  addFriendMessage(message) {
    this.state.chatRows.push(
      <View key={this.state.chatRows.length} style={styles.friendMessageRow}>
        <View style={styles.friendMessageBox}>
          <Text style={styles.friendMessage}>{message}</Text>
        </View>
      </View>
    );
  }

  postImage(assetUri) {
    this.state.chatRows.push(
      <View key={this.state.chatRows.length} style={styles.myMessageRow}>
        <View style={styles.myMessageBox}>
          <Image
            source={{uri: assetUri}}
            style={styles.imageStyle}
          />
        </View>
      </View>
    );
    this.setState({chatRows: this.state.chatRows});
  }

  selectImage(props, context) {
    props.navigator.push({
      name: 'Image Selection',
      component: ImageSelection,
      passProps: {context: this}
    })
  };

  scrollToBottom() {
    this.refs.chatScrollView.scrollTo(
      {y: this.scrollContentHeight - this.scrollViewHeight, animated: true}
    )
  }

  render() {
    var loading = !this.state.showLoading ? null :
      <View ref="loading" style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading chat history...</Text>
      </View>;
    var imageButtonPlaceholder = !(Platform.OS === 'android') ? null:
      <Text style={styles.imageButton} onPress={() => this.selectImage(this.props, this)}>Images</Text>
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatTitleContainer}>
          <Text style={styles.chatBackButton} onPress={() => this.props.navigator.pop()}>Back</Text>
          <Text style={styles.chatTitle}>{this.props.title}</Text>
          {imageButtonPlaceholder}
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
