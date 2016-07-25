/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid,
} from 'react-native';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

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
          _navigator = navigator;
          return React.createElement(route.component, { navigator , ...route.passProps});
        }}
        />
    )
  };
}

AppRegistry.registerComponent('ChatApp', () => ChatApp);
