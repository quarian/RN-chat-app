import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  InteractionManager,
} from 'react-native';

var ChatInput = require('./ChatInput');

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

module.exports = ChatView;
