import React from 'react';
import { View } from 'react-native';

import Header from '../components/Header';
import PagesContainer from '../containers/PagesContainer';

export default class HomeScreen extends React.Component {
  render() {
    return (
        <View>
          <Header title="Welcome" />
              <PagesContainer title="Home" />
        </View>
    );
  }
}
