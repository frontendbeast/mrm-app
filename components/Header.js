import React from 'react';
import { Text, View } from 'react-native';

import { colors, dimensions } from '../styles/Variables';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.header}>
         <Text style={styles.headerTitle}>{ this.props.title }</Text>
      </View>
    );
  }
}

const styles = {
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: dimensions.gutter,
    paddingTop: dimensions.gutter + dimensions.statusBarHeight,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryText,
  }
};
