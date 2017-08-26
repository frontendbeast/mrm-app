import React from 'react';
import { View } from 'react-native';

import Header from '../components/Header';
import PagesContainer from '../containers/PagesContainer';
import globalStyles from '../styles/Styles';

export default class HomeScreen extends React.Component {
  render() {
    return (
        <View>
        <View style={globalStyles.fullsize}>
          <Header title="Welcome" />
              <PagesContainer title="Home" />
        </View>
    );
  }
}
