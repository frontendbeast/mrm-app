import React from 'react';
import { View } from 'react-native';

import Header from '../components/Header';

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
        <View>
          <Header title="Welcome" />
        </View>
    );
  }
}
