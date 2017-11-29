import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { getEventByID } from '../actions/getEvents';

import Header from '../components/Header';
import EventDetailContainer from '../containers/EventDetailContainer';

import globalStyles from '../styles/Styles';

export default class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header back={true}/>
        <ScrollView contentContainerStyle={{minHeight: '100%'}}>
          <EventDetailContainer id={this.props.navigation.state.params.id} />
        </ScrollView>
      </View>
    );
  }
}
