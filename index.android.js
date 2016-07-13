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
          console.log(route);
          if (route.component) {
            return React.createElement(route.component, { navigator })
          }
        }}
        />
    );
  }
}

class ChatListView extends Component {
  render() {
    return (
      <ScrollView>
        <Thumb/>
        <Thumb/>
        <Thumb/>
        <Thumb/>
        <Thumb/>
        <Thumb/>
        <Thumb/>
      </ScrollView>
    );
  }
}

class Thumb extends Component {
  _onPressButton() {
    _navigator.push({
      name: 'Chat View',
      component: ChatView
    });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style={styles.welcome}>TAHJKHSDKHK</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class ChatView extends Component {
  render() {
    return (
      <View>
        <Text>ahjkhlkjahflkj</Text>
      </View>
    )
  }
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
});

AppRegistry.registerComponent('ChatApp', () => ChatApp);
