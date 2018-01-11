import React from 'react';
import { Image, View } from 'react-native';

import componentStyles from '../styles/loading';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={componentStyles['loading']}>
        <Image source={require('../assets/images/loading.gif')} style={componentStyles['loading__centered']} resizeMode="contain" />
      </View>
    );
  }
}
