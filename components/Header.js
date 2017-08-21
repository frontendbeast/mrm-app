import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { colors, dimensions } from '../styles/Variables';

const Header = ({ openDrawer, title }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerNavButton} onPress={openDrawer}>
      <Text>Menu</Text>
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{ title }</Text>
    <View style={styles.headerSpacer} />
  </View>
);

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({  });

const mapDispatchToProps = dispatch => ({
  openDrawer: () =>
    dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = {
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    padding: dimensions.gutter,
    paddingTop: dimensions.gutter + dimensions.statusBarHeight,
  },
  headerNavButton: {
    alignSelf: 'flex-start',
    color: '#f00',
    flex: 1,
    fontSize: 16,
  },
  headerSpacer: {
    alignSelf: 'flex-end',
    flex: 1,
  },
  headerTitle: {
    color: colors.primaryText,
    flex: 3,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
};
