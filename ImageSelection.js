import React, { Component } from 'react';
import {
  CameraRoll,
  Image,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

const CameraRollView = require('./CameraRollView');
const styles = require('./Styles');

const CAMERA_ROLL_VIEW = 'camera_roll_view';

class ImageSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animationFinished: false,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({animationFinished: true})
    });
  }

  render() {
    var showRoll = !this.state.animationFinished ?
      <View ref="loading" style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading photos...</Text>
      </View> :
        <CameraRollView
          ref={CAMERA_ROLL_VIEW}
          batchSize={20}
          renderImage={this.renderImage}
          returnImage={this.returnImage}
          navigator={this.props.navigator}
          parent={this.props.context}
        />;
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatTitleContainer}>
          <Text style={styles.chatBackButton} onPress={() => this.props.navigator.pop()}>Back</Text>
          <Text style={styles.chatTitle}>Select Image</Text>
        </View>
        <View style={styles.imagesContainer}>
          {showRoll}
        </View>
      </View>
    );
  }

  returnImage(props, asset) {
    props.parent.postImage(asset.node.image.uri);
    props.parent.state.ws.send("__IMAGE__" + asset.node.image.uri);
    props.navigator.pop();
  }

  renderImage(asset, props) {
    const imageSize = 150;
    return (
      <TouchableOpacity key={asset} onPress={() => props.returnImage(props, asset)}>
        <View style={styles.imageColumn}>
          <Image
            source={asset.node.image}
            style={styles.imageStyle}
          />
          <View>
            <Text style={styles.imageInfo}>{asset.node.group_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

module.exports = ImageSelection;
