import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

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

const mapStateToProps = state => ({  });

const mapDispatchToProps = dispatch => ({
  openDrawer: () =>
    dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);



const styles = {
  header: {
    backgroundColor: colors.header,
    flexDirection: 'row',
    padding: dimensions.gutter,
    paddingTop: dimensions.gutter + dimensions.statusBarHeight,
  },
  headerNavButton: {
    alignSelf: 'flex-start',
    flex: 1,
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
