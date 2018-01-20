import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import Moment from 'moment';

import Loading from './Loading';

import sharedStyles from '../styles/shared';
import componentStyles from '../styles/eventListing';

class EventListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetEvents();
    this.props.onGetVenues();
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
        const data = Object.assign({}, event, { id, venue });

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
      <View style={sharedStyles['fullsize']}>

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
                    style={[componentStyles['event'], index === listings.length - 1 && componentStyles['event--last']]}
                    onPress={() => { this.props.viewDetail(event.id); }}
                  >
                    <View style={componentStyles['event__link']}>
                      <Text style={componentStyles['event__name']}>{ event.name }</Text>
                      <Text>{ Moment(event.date).format('ha') } @ { event.venue.name }</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

            </View>
          );
        })}
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
