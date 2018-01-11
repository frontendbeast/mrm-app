import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { NavigationActions, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import componentStyles from '../styles/header';

const Header = ({ openDrawer, dismiss, title, back }) => (

  <SafeAreaView style={{backgroundColor: '#000'}}>
    <View style={componentStyles['header']}>
      <View style={componentStyles['header__container']}>
      {back ?
        <TouchableOpacity style={componentStyles['header__nav-button']} onPress={dismiss}>
          <Text>Back</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={componentStyles['header__nav-button']} onPress={openDrawer}>
          <Image source={require('../assets/images/nav-btn.png')} resizeMode="contain" />
        </TouchableOpacity>
      }
      <View style={{}}>
        <Image source={require('../assets/images/logo.png')} style={componentStyles['header__logo']} resizeMode="contain" />
      </View>
      <View style={componentStyles.header__spacer} />
      </View>
    </View>
  </SafeAreaView>
);

const mapStateToProps = state => ({  });

const mapDispatchToProps = dispatch => ({
  openDrawer: () =>
    dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
  dismiss: () =>
    dispatch(NavigationActions.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
