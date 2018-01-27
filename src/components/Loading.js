import React from 'react';
import { Image, View } from 'react-native';

import componentStyles from '../styles/loading';

export default class Loading extends React.Component {
  render() {
    const { img } = this.props;

    const image = (img) ? require('../assets/images/loading-img.gif') : require('../assets/images/loading.gif');
    const styles = [componentStyles['loading']];

    if (img) {
      styles.push(componentStyles['loading--img']);
    }

    return (
      <View style={styles}>
        <Image source={image} style={componentStyles['loading__centered']} resizeMode="contain" />
      </View>
    );
  }
}
