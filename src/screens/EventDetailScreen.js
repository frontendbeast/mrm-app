import React from 'react';
import { ScrollView, View } from 'react-native';

import Header from '../components/Header';
import EventDetailContainer from '../containers/EventDetailContainer';

import sharedStyles from '../styles/shared';

export default class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[sharedStyles['content'], sharedStyles['fullsize']]}>
        <Header back={true}/>
        <ScrollView contentContainerStyle={sharedStyles['fullsize']}>
          <EventDetailContainer id={this.props.navigation.state.params.id} />
        </ScrollView>
      </View>
    );
  }
}
