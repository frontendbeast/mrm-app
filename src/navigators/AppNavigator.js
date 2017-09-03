import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator } from 'react-navigation';

import PropTypes from 'prop-types';

import EventsScreen from '../screens/EventsScreen';
import HomeScreen from '../screens/HomeScreen';
import TeamScreen from '../screens/TeamScreen';

export const AppNavigator = DrawerNavigator({
  Home: { screen: HomeScreen },
  Events: { screen: EventsScreen },
  Team: { screen: TeamScreen },
},{
  mode: 'modal',
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={ addNavigationHelpers({ dispatch, state: nav }) } />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
