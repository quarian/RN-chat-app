/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Navigator,
  BackAndroid,
  TextInput,
  Alert,
  InteractionManager,
} from 'react-native';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});


function makeAlert(message) {
  Alert.alert(
      'ALERT!',
      message,
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
};


class ChatApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: 'Chat List', component: ChatListView}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          _navigator = navigator;
          return React.createElement(route.component, { navigator , ...route.passProps});
        }}
        />
    )
  };
}

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

AppRegistry.registerComponent('ChatApp', () => ChatApp);
