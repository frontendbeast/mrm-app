import React from 'react';

import { Text, View } from 'react-native';

export default class Venues extends React.Component {
  componentWillMount() {
    this.props.onGetVenues();
  }

  render() {
    const venues = [];

    for (let key in this.props.venues.data) {
      venues.push(this.props.venues.data[key]);
    }

    return (
      <View>
        {venues.map(venue => { return <Text>{ venue.name }</Text>; })}
      </View>
    );
  }
}
