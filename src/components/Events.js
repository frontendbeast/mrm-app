import React from 'react';
import Moment from 'moment';

import { Text, View } from 'react-native';

import { dimensions } from '../styles/Variables';
import globalStyles from '../styles/Styles';

export default class Events extends React.Component {
  componentWillMount() {
    this.props.onGetEvents();
  }

  render() {
    const { events } = this.props;

    if ((events.loading === undefined || events.loading) && !events.data) {
      return null;
    }

    const items = Object
      .entries(events.data)
      .map(([id, event]) => { return { ...event, id: id }; })
      .sort((a, b) => { return Date.parse(b.date) - Date.parse(a.date); });

    return (
      <View style={globalStyles.container}>
        {items.map((event) => {
          return (
            <View key={event.id} style={styles.event}>
              <Text style={styles.heading}>{ event.name }</Text>
              <Text>{ Moment(event.date).format('ha') } @ { event.venue.name }</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = {
  event: {
    marginBottom: dimensions.gutter,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  }
};
