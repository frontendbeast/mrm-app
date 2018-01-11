import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';

import Moment from 'moment';

import sharedStyles from '../styles/shared';

export default class EventDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events, id } = this.props;

    if ((events.loading === undefined || events.loading) && !events.data) {
      return null;
    }

    const event = events.data[id];

    return (
      <View>
        <View style={sharedStyles['container']}>
          <Text style={sharedStyles['heading']}>{ event.name }</Text>
          <Text>{ Moment(event.date).format('dddd, ha') }</Text>
          <Text>{ event.venue.name }</Text>
        </View>
        { event.venue.location ?
        <View style={{ paddingTop: '56.666666%' }}>
          <Image style={sharedStyles['absolute-cover']} source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=53.4773871,-2.2371085&zoom=17&scale=1&size=600x340&maptype=roadmap&format=png&visual_refresh=true&markers=icon:https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-64.png%7C${event.venue.location.lat},+${event.venue.location.lon}` }} resizeMode="cover" />
        </View>
        : null }
      </View>
    );
  }
}
