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
      userJson: ""
    }
    this.getChats()
  }

  getChats() {
    console.log("Getting chats");
    fetch('https://elegant-saucisson-63110.herokuapp.com/db')
      .then((response) => response.text())
      .then((responseText) => this.setState({userJson: JSON.parse(responseText)}))
      .catch((error) => console.warn(error))
  }

  render() {
    return (
      <ScrollView>
        <Thumb name={this.state.userJson[0]} navigator={this.props.navigator}/>
        <Thumb name={this.state.userJson[1]} navigator={this.props.navigator}/>
        <Thumb name={this.state.userJson[2]} navigator={this.props.navigator}/>
        <Thumb name={this.state.userJson[3]} navigator={this.props.navigator}/>
        <Thumb name={this.state.userJson[4]} navigator={this.props.navigator}/>
        <Thumb name={this.state.userJson[5]} navigator={this.props.navigator}/>
      </ScrollView>
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
    this.state = { chatRows: [] };
    this.getChatHistory()
  }

  getChatHistory() {
    console.log(this.props.title)
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
    for (var i = 0; i < historyJson.length; i++) {
      this._addRow(historyJson[i][1])
    }
  }

  _addRow(message) {
    this.state.chatRows.push(<Text key={this.state.chatRows.length}>{message}</Text>);
    this.setState({chatRows: this.state.chatRows});
    return message
  }

  render() {
    return (
      <View>
        <Text style={styles.welcome}>{this.props.title}</Text>
        {this.state.chatRows}
        <ChatInput parent={this}/>
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
    console.log(this.state.text);
    parent._addRow(this.state.text);
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
      .then((responseText) => parent._addRow(responseText))
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
});

AppRegistry.registerComponent('ChatApp', () => ChatApp);
