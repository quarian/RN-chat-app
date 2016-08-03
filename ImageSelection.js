import React, { Component } from 'react';
import {
  CameraRoll,
  Image,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const CameraRollView = require('./CameraRollView');

const CAMERA_ROLL_VIEW = 'camera_roll_view';

class ImageSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.info}>
        <CameraRollView
          ref={CAMERA_ROLL_VIEW}
          batchSize={20}
          renderImage={this._renderImage}
          returnImage={this.returnImage}
          navigator={this.props.navigator}
          parent={this.props.context}
        />
      </View>
    );
  }

  returnImage(props, asset) {
    props.parent.postImage(asset);
    props.navigator.pop();
  }

  _renderImage(asset, props) {
    const imageSize = 150;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    return (
      <TouchableOpacity key={asset} onPress={() => props.returnImage(props, asset)}>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={styles.info}>
            <Text>{asset.node.group_name}</Text>
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
});

module.exports = ImageSelection;
