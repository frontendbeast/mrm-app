import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import PropTypes from 'prop-types';

import TeamDetailScreen from '../screens/TeamDetailScreen';
import TeamListingScreen from '../screens/TeamListingScreen';

export const TeamNavigator = StackNavigator({
  TeamListing: { screen: TeamListingScreen },
  TeamDetail: { screen: TeamDetailScreen },
},{
  headerMode: 'none',
});

const TeamWithNavigationState = ({ dispatch, navTeam }) => (
  <TeamNavigator navigation={ addNavigationHelpers({ dispatch, state: navTeam}) } />
);

TeamWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navTeam: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  navTeam: state.navTeam,
});

export default connect(mapStateToProps)(TeamWithNavigationState);
