import React from 'react';
import Moment from 'moment';

import { Text, View } from 'react-native';

export default class Events extends React.Component {
  componentWillMount() {
    this.props.onGetEvents();
  }

  render() {
    const { events } = this.props;

    if (events.loading || !events.data) {
      return null;
    }

    return (
      <View>
        {Object.entries(events.data).map(([id, event]) => {
          return <Text>{ event.name }, { event.venue.name } @ { Moment(event.date).format('ha') }</Text>;
        })}
      </View>
    );
  }
}
