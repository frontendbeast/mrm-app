import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import PropTypes from 'prop-types';

import EventDetailScreen from '../screens/EventDetailScreen';
import EventListingScreen from '../screens/EventListingScreen';

export const EventsNavigator = StackNavigator({
  EventListing: { screen: EventListingScreen },
  EventDetail: { screen: EventDetailScreen },
},{
  headerMode: 'none',
});

const EventsWithNavigationState = ({ dispatch, navEvents }) => (
  <EventsNavigator navigation={ addNavigationHelpers({ dispatch, state: navEvents}) } />
);

EventsWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navEvents: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  navEvents: state.navEvents,
});

export default connect(mapStateToProps)(EventsWithNavigationState);
