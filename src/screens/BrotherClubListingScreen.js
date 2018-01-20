import React from 'react';
import { ScrollView, View } from 'react-native';

import Header from '../components/Header';
import BrotherClubListingContainer from '../containers/BrotherClubListingContainer';

import sharedStyles from '../styles/shared';

export default class BrotherClubListingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[sharedStyles['content'], sharedStyles['fullsize']]}>
        <Header/>
        <ScrollView>
          <BrotherClubListingContainer/>
        </ScrollView>
      </View>
    );
  }
}
