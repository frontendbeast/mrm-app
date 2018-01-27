import React from 'react';
import { View } from 'react-native';

import Header from '../components/Header';
import EventListingContainer from '../containers/EventListingContainer';

import sharedStyles from '../styles/shared';

export default class EventListingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[sharedStyles['app'], sharedStyles['fullsize']]}>
        <Header/>
        <EventListingContainer />
      </View>
    );
  }
}
