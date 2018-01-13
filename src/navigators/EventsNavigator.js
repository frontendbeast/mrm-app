import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';

import PropTypes from 'prop-types';

import EventDetailScreen from '../screens/EventDetailScreen';
import EventListingScreen from '../screens/EventListingScreen';

export const EventsNavigator = StackNavigator({
  EventListing: { screen: EventListingScreen },
  EventDetail: { screen: EventDetailScreen },
},{
  headerMode: 'none',
});

class EventsWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navEvents: PropTypes.object.isRequired,
  };

  onBackPress = () => {
    const { dispatch, navEvents } = this.props;

    if (navEvents.index === 1) {
      dispatch(NavigationActions.back());
      return true;
    }
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  render() {
    const { dispatch, navEvents } = this.props
    const navigation = addNavigationHelpers({
        dispatch,
        state: navEvents
    })

    return <EventsNavigator navigation={navigation} />
  }
};

const mapStateToProps = state => ({
  navEvents: state.navEvents,
});

export default connect(mapStateToProps)(EventsWithNavigationState);
