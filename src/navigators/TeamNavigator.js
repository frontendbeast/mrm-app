import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';

import PropTypes from 'prop-types';

import TeamDetailScreen from '../screens/TeamDetailScreen';
import TeamListingScreen from '../screens/TeamListingScreen';

export const TeamNavigator = StackNavigator({
  TeamListing: { screen: TeamListingScreen },
  TeamDetail: { screen: TeamDetailScreen },
},{
  headerMode: 'none',
});

class TeamWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navTeam: PropTypes.object.isRequired,
  };

  onBackPress = () => {
    const { dispatch, navTeam } = this.props;

    if (navTeam.index === 1) {
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
    const { dispatch, navTeam } = this.props
    const navigation = addNavigationHelpers({
        dispatch,
        state: navTeam
    })

    return <TeamNavigator navigation={navigation} />
  }
};

const mapStateToProps = state => ({
  navTeam: state.navTeam,
});

export default connect(mapStateToProps)(TeamWithNavigationState);
