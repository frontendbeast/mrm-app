import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import Moment from 'moment';

import Loading from './Loading';

import { colors, dimensions } from '../styles/Variables';
import globalStyles from '../styles/Styles';

class EventListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetEvents();
  }

  render() {
    const { events } = this.props;

    if ((events.loading === undefined || events.loading) && !events.data) {
      return <Loading />;
    }

    const items = Object
      .entries(events.data)
      .map(([id, event]) => { return { ...event, id: id }; })
      .sort((a, b) => { return Date.parse(a.date) - Date.parse(b.date); });

    const days = {};

    items.map(event => {
      const day = Moment(event.date).format('dddd');
      days[day] = days[day] || [];
      days[day].push(event);
    });

    return (
      <View style={globalStyles.fullsize}>

        {Object.entries(days).map(([day, listings]) => {
          return (
            <View key={day}>
              <View style={styles.day}>
                <Text style={styles.day__name}>{ day }</Text>
              </View>
              {listings.map((event, index) => {
                return (
                  <TouchableOpacity
                    key={event.id}
                    style={[styles.event, index === listings.length - 1 && styles['event--last']]}
                    onPress={() => { this.props.viewDetail(event.id); }}
                  >
                    <View style={styles.event__link}>
                      <Text style={styles.event__name}>{ event.name }</Text>
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

const mapStateToProps = state => ({  });

const mapDispatchToProps = dispatch => ({
  viewDetail: (id) =>
    dispatch(NavigationActions.navigate({ routeName: 'EventDetail', params: { id: id } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListing);

const styles = {
  'day': {
    backgroundColor: colors.listItemHeader,
    padding: dimensions.gutter,
  },
  'day__name': {
    color: colors.listItemHeaderText,
    fontWeight: 'bold',
  },
  'event': {
    borderBottomColor: colors.listItemBorder,
    borderBottomWidth: 0.5,
  },
  'event--last': {
    borderBottomWidth: 0,
  },
  'event__link': {
    borderBottomWidth: 0,
    padding: dimensions.gutter,
  },
  'event__name': {
    fontWeight: 'bold',
  }
};
