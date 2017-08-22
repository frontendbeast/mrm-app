import React from 'react';
import Moment from 'moment';

import { Text, View } from 'react-native';

export default class Events extends React.Component {
  componentWillMount() {
    this.props.onGetEvents();
    this.props.onGetVenues();
  }

  render() {
    if (this.props.events.loading || this.props.venues.loading) {
      return null;
    }

    const events = [];

    for (let key in this.props.events.data) {
      let event = {...this.props.events.data[key]};
      event.venue = {...this.props.venues.data[event.venue]};

      events.push(event);
    }

    return (
      <View>
        {events.map(event => { return <Text>{ event.name }, { event.venue.name } @ { Moment(event.date).format('ha') }</Text>; })}
      </View>
    );
  }
}
