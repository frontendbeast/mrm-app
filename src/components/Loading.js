import React from 'react';
import { Image, View } from 'react-native';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image source={require('../assets/images/loading.gif')} style={{alignSelf: 'center'}} resizeMode="contain" />
      </View>
    );
  }
}
