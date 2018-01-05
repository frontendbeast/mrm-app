import React from 'react';
import { ScrollView, View } from 'react-native';

import Header from '../components/Header';
import EventListingContainer from '../containers/EventListingContainer';

import globalStyles from '../styles/Styles';

export default class EventListingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header/>
        <ScrollView contentContainerStyle={{minHeight: '100%'}}>
          <EventListingContainer/>
        </ScrollView>
      </View>
    );
  }
}
