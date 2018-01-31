import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, SafeAreaView } from 'react-navigation';

import { getAdverts } from '../actions/getAdverts';
import { getAssets } from '../actions/getAssets';
import { getPages } from '../actions/getPages';
import { getSettings } from '../actions/getSettings';
import { sync } from '../actions/sync';

import Header from '../components/Header';

import sharedStyles from '../styles/shared';
import componentStyles from '../styles/menu';

class Menu extends React.Component {
  componentDidMount() {
    this.props.onGetAdverts();
    this.props.onGetAssets();
    this.props.onGetPages();
    this.props.onGetSettings();
    this.props.onSync();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sync.error && !Object.keys(nextProps.settings.data).length) {
      this.props.networkError();
    }
  }

  render () {
    const { closeDrawer, networkError, pages, settings, sync } = this.props;

    if (!pages || !pages.data || !settings || !settings.data || !Object.keys(settings.data).length) {
      return null;
    }

    const menu = settings.data[Object.keys(settings.data)[0]].menu;

    const renderLink = (routeName, title, id) => {
      const key = (id) ? id : Math.floor(Math.random() * (100000 + 1));

      return (
        <TouchableOpacity key={key} onPress={() => { this.props.navigateTo(routeName, id); }}>
          <Text style={[sharedStyles['tape--md'], {marginTop: 16, alignSelf: 'center'}]}>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView style={sharedStyles['fullsize']}>
        <TouchableOpacity style={componentStyles['header__nav-button']} onPress={closeDrawer}>
          <Image source={require('../assets/images/close-btn.png')} resizeMode="contain" style={sharedStyles['app']} />
        </TouchableOpacity>
        <View style={sharedStyles['fullsize']}>
        {menu.map((item, index) => {
          const items = [];

          const page = pages.data[item];
          const routeName = (page.appScreen) ? page.appScreen : 'Page';

          items.push(renderLink(routeName, page.title, item));

          return items;
        })}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  adverts: state.adverts,
  assets: state.assets,
  pages: state.pages,
  settings: state.settings,
  sync: state.sync,
});

const mapDispatchToProps = dispatch => ({
  onGetAdverts: () => dispatch(getAdverts()),
  onGetAssets: () => dispatch(getAssets()),
  onGetPages: () => dispatch(getPages()),
  onGetSettings: () => dispatch(getSettings()),
  onSync: () => dispatch(sync()),
  navigateTo: (routeName, id) => {
    const options = {
      routeName: routeName,
    };

    if (id) {
      options.params = { id: id };
    }

    dispatch(NavigationActions.navigate(options));
  },
  closeDrawer: () =>
    dispatch(NavigationActions.navigate({ routeName: 'DrawerClose' })),
  networkError: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Network Error' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
