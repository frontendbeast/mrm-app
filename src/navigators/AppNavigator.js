import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator } from 'react-navigation';

import PropTypes from 'prop-types';

import Menu from '../components/Menu';

import BrotherClubListingScreen from '../screens/BrotherClubListingScreen';
import EventsScreen from '../screens/EventsScreen';
import HomeScreen from '../screens/HomeScreen';
import PageScreen from '../screens/PageScreen';
import TeamScreen from '../screens/TeamScreen';

export const AppNavigator = DrawerNavigator({
  'Brother Clubs': { screen: BrotherClubListingScreen },
  'Events': { screen: EventsScreen },
  'Home': { screen: HomeScreen },
  'Page': { screen: PageScreen },
  'Team': { screen: TeamScreen },
},{
  contentComponent: Menu,
  initialRouteName: 'Home',
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={ addNavigationHelpers({ dispatch, state: nav }) } />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(AppWithNavigationState);
