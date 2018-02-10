import React from 'react';
import { Image, Linking, TouchableOpacity, Text, View } from 'react-native';
import { NavigationActions, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import componentStyles from '../styles/header';

class Header extends React.Component {
  render () {
    const { openDrawer, dismiss, title, back, settings } = this.props;

    const ticketsLink = (settings && settings.data && Object.keys(settings.data).length && settings.data[Object.keys(settings.data)[0]].ticketsLink) ? settings.data[Object.keys(settings.data)[0]].ticketsLink : false;
    const navButton = (settings && settings.data && Object.keys(settings.data).length);

    return (
      <SafeAreaView style={componentStyles['header']}>
        <View style={componentStyles['header__container']}>
          { back ?
          <TouchableOpacity style={componentStyles['header__nav-button']} onPress={dismiss}>
            <Image source={require('../assets/images/back-btn.png')} resizeMode="contain" />
          </TouchableOpacity> : navButton ?
          <TouchableOpacity style={componentStyles['header__nav-button']} onPress={openDrawer}>
            <Image source={require('../assets/images/nav-btn.png')} resizeMode="contain" />
          </TouchableOpacity> :
          <View style={componentStyles['header__spacer-left']} />
           }
          <View>
            <Image source={require('../assets/images/logo.png')} style={componentStyles['header__logo']} resizeMode="contain" />
          </View>
        { ticketsLink ?
          <TouchableOpacity style={componentStyles['header__tickets-button']} onPress={() => { Linking.openURL(ticketsLink); }}>
            <Image source={require('../assets/images/tickets-btn.png')} resizeMode="contain" />
          </TouchableOpacity> :
          <View style={componentStyles['header__spacer-right']} />
        }
        </View>
      </SafeAreaView>
    );
  };
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  openDrawer: () =>
    dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
  dismiss: () =>
    dispatch(NavigationActions.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
