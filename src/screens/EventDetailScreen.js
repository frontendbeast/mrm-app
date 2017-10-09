import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { clearCache } from '../actions/clearCache';
import { getEventByID } from '../actions/getEvents';

import Header from '../components/Header';
import EventDetailContainer from '../containers/EventDetailContainer';

import globalStyles from '../styles/Styles';

export default class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });

    store
      .dispatch(clearCache('events', 'id', this.props.navigation.state.params.id))
      .then(() => {
        store
          .dispatch(getEventByID(this.props.navigation.state.params.id))
          .then(() => {
            this.setState({isRefreshing: false});
          });
      });
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header title="Event Details" back={true} />
        <PullToRefresh
          isRefreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
        >
          <ScrollView contentContainerStyle={{minHeight: '100%'}}>
            <EventDetailContainer id={this.props.navigation.state.params.id} />
          </ScrollView>
        </PullToRefresh>
      </View>
    );
  }
}
