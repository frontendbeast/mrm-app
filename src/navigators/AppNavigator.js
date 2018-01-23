import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator, NavigationActions } from 'react-navigation';

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

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  onBackPress = () => {
    const { dispatch, nav } = this.props;

    if (nav.index === 1) {
      dispatch(NavigationActions.navigate({ routeName: 'DrawerClose' }));
      return true;
    } else

    if (nav.index === 0) {
      const route =  nav.routes[0];

      const index = nav.routes[0].index;
      const routes = nav.routes[0].routes;

      dispatch(NavigationActions.navigate({ routeName: 'Home' }));

      if (routes[index].routeName !== 'Home') {
        return true;
      }
    }
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  render() {
    const { dispatch, nav } = this.props
    const navigation = addNavigationHelpers({
        dispatch,
        state: nav
    })

    return <AppNavigator navigation={navigation} />
  }
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
