import React from 'react';
import { View } from 'react-native';

import Header from '../components/Header';

export default class HomeScreen extends React.Component {
  render() {
    return (
        <View>
          <Header title="Welcome" />
        </View>
    );
  }
}
