import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { NavigationActions, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { colors, dimensions } from '../styles/Variables';

const Header = ({ openDrawer, dismiss, title, back }) => (

  <SafeAreaView style={{backgroundColor: '#000'}}>
    <View style={styles.header}>
      <View style={styles.headerContainer}>
      {back ?
        <TouchableOpacity style={styles.headerNavButton} onPress={dismiss}>
          <Text>Back</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={styles.headerNavButton} onPress={openDrawer}>
          <Image source={require('../assets/images/nav-btn.png')} resizeMode="contain" />
        </TouchableOpacity>
      }
      <View style={{}}>
        <Image source={require('../assets/images/logo.png')} style={styles.headerLogo} resizeMode="contain" />
      </View>
      <View style={styles.headerSpacer} />
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

const styles = {
  header: {
    backgroundColor: '#000',
  },
  headerContainer: {
    backgroundColor: colors.header,
    flexDirection: 'row',
  },
  headerLogo :{
    marginTop:  dimensions.gutter - 1,
    width: 150,
  },
  headerNavButton: {
    alignSelf: 'flex-start',
    flex: 1,
    padding: dimensions.gutter,
    width: 30,
  },
  headerSpacer: {
    alignSelf: 'flex-end',
    flex: 1,
    padding: dimensions.gutter,
    width: 30,
  }
};
