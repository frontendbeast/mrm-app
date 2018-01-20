import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Moment from 'moment';

import sharedStyles from '../styles/shared';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { assets, events, id, venues } = this.props;

    if (!assets || !assets.data || !events || !events.data) {
      return null;
    }

    const venue = venues.data[events.data[id].venue];
    const event = Object.assign({}, events.data[id], { venue: venue });

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

const mapStateToProps = state => ({
  assets: state.assets,
  events: state.events,
  venues: state.venues
 });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);

