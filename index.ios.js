/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
  AppRegistry,
  Navigator,
 } from 'react-native';

var ChatListView = require('./ChatListView');
class ChatApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: 'Chat List', component: ChatListView}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          return React.createElement(route.component, { navigator , ...route.passProps});
        }}
      />
    )
  };
}

AppRegistry.registerComponent('ChatApp', () => ChatApp);
