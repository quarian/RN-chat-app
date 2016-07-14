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
} from 'react-native';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

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
          return React.createElement(route.component, { navigator });
        }}
        />
    )
  };
}

class ChatListView extends Component {
  render() {
    return (
      <ScrollView>
        <Thumb name='YAY' navigator={this.props.navigator}/>
      </ScrollView>
    )
  };
}

class Thumb extends Component {
  _onPressButton(props) {
    props.navigator.push({
      name: 'Chat View',
      component: ChatView
    })
  };

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => this._onPressButton(this.props)}>
          <Text style={styles.welcome}>
            TAHJKHSDKHK {this.props.name}
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
  }

  _addRow(message) {
    this.state.chatRows.push(<Text key={this.state.chatRows.length}>{message}</Text>);
    console.log('CALLING FUNCTION');
    this.setState({chatRows: this.state.chatRows});
  }

  render() {
    return (
      <View>
        <Text style={styles.welcome}>ahjkhlkjahflkj</Text>
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
