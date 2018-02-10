import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import Moment from 'moment';

import Loading from './Loading';
import ImageLoader from './ImageLoader';

import { dimensions } from '../styles/variables';
import sharedStyles from '../styles/shared';
import componentStyles from '../styles/eventListing';

class EventListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetEvents();
    this.props.onGetVenues();
    this.props.onTrackScreenView('Events');
  }

  render() {
    const { assets, events, venues } = this.props;

    if (!assets || !assets.data || !events || !events.data || !venues || !venues.data) {
      return <Loading />;
    }

    const items = Object
      .entries(events.data)
      .map(([id, event]) => {
        const venue = venues.data[event.venue];
        const imageListing = assets.data[event.imageListing];
        const data = Object.assign({}, event, { id, venue, imageListing });

        return data;
      })
      .sort((a, b) => { return Date.parse(a.date) - Date.parse(b.date); });

    const days = {};

    items.map(event => {
      const day = Moment(event.date).format('dddd');
      days[day] = days[day] || [];
      days[day].push(event);
    });

    return (
      <View style={[sharedStyles['fullsize']]}>
        <ScrollView>
          {Object.entries(days).map(([day, listings]) => {
            return (
              <View key={day}>
                <View style={componentStyles['day']}>
                  <Text style={componentStyles['day__name']}>{ day }</Text>
                </View>
                {listings.map((event, index) => {
                  return (
                    <TouchableOpacity
                      key={event.id}
                      style={componentStyles['event']}
                      onPress={() => { this.props.viewDetail(event.id); }}
                    >
                      <View style={componentStyles['event__link']}>
                        {event.imageListing ?
                        <ImageLoader source={`https:${event.imageListing.file.url}`} height={event.imageListing.file.details.image.height} width={event.imageListing.file.details.image.height} imgSize={dimensions.images.lg} style={[sharedStyles['absolute-cover'], {opacity: 0.7}]} resizeMode='cover' />
                        : <View style={componentStyles['event__separator']} /> }
                        <View style={componentStyles['event__text']}>
                          <Text style={sharedStyles['tape--md']}>{ event.name }</Text>
                          <Text style={sharedStyles['tape--sm']}>{ Moment(event.date).format('h:mm') } @ { event.venue.name }</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}

              </View>
            );
          })}
        </ScrollView>
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
  viewDetail: (id) =>
    dispatch(NavigationActions.navigate({ routeName: 'EventDetail', params: { id: id } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListing);
