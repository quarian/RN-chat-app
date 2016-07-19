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
      <View>
        <Text style={styles.welcome}>CleanChat</Text>
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
      <View>
        <TouchableHighlight onPress={() => this._onPressButton(this.props)}>
          <Text style={styles.welcome}>
            {this.props.name}
          </Text>
        </TouchableHighlight>
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
      this.state.chatRows.push(<Text style={styles.myMessage} key={this.state.chatRows.length}>{message}</Text>);
    } else {
      this.state.chatRows.push(<Text style={styles.friendMessage} key={this.state.chatRows.length}>{message}</Text>);
    }
    this.setState({chatRows: this.state.chatRows});
    return message
  }

  render() {
    var loading = this.state.showLoading ? <Text ref="loading" style={styles.welcome}>Loading chat history...</Text> : null;
    return (
      <View style={styles.chatContainer}>
        <Text style={styles.welcome}>{this.props.title}</Text>
        <ScrollView ref="_chatScrollView" style={styles.chatMessages}
          onContentSizeChange={(width, height)=>{
              this.refs._chatScrollView.scrollTo({x:0, y:height, animated:true})
          }}>
          {loading}
          {this.state.chatRows}
        </ScrollView>
        <ChatInput style={styles.chatInput} parent={this}/>
      </View>
    )
  };
}

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
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
        style={styles.chatinput}
        returnKeyType='done'
        onChangeText={(text) => this.setState({text})}
        onSubmitEditing={(text) =>
          this.postChatMessage(text, this.props.parent)}
        value={this.state.text}
      />
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  chatinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  chatContainer: {
    flex: 1
  },
  chatMessages: {
    flex: 1
  },
  chatInput: {
    flex: 1
  },
  myMessage: {
    textAlign: 'right'
  },
  friendMessage: {
    textAlign: 'left'
  },
});

AppRegistry.registerComponent('ChatApp', () => ChatApp);
