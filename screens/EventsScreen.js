import React from 'react';
import { View } from 'react-native';

import Header from '../components/Header';
import EventsContainer from '../containers/EventsContainer';

export default class EventsScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View>
          <Header title="Events" />
          <EventsContainer/>
        </View>
    );
  }
}