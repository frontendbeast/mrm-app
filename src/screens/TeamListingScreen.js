import React from 'react';
import { ScrollView, View } from 'react-native';

import Header from '../components/Header';
import TeamListingContainer from '../containers/TeamListingContainer';

import sharedStyles from '../styles/shared';

export default class TeamListingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[sharedStyles['app'], sharedStyles['fullsize']]}>
        <Header/>
        <TeamListingContainer/>
      </View>
    );
  }
}
