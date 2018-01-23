import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, SafeAreaView } from 'react-navigation';

import { getAdverts } from '../actions/getAdverts';
import { getAssets } from '../actions/getAssets';
import { getPages } from '../actions/getPages';
import { getSettings } from '../actions/getSettings';
import { sync } from '../actions/sync';

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

  render () {
    const { pages, settings } = this.props;

    if(!pages || !pages.data || !settings || !settings.data || !Object.keys(settings.data).length) {
      return null;
    }

    const menu = settings.data[Object.keys(settings.data)[0]].menu;

    const renderLink = (routeName, title, id) => {
      const key = (id) ? id : Math.floor(Math.random() * (100000 + 1));

      return (
        <TouchableOpacity key={key} onPress={() => { this.props.navigateTo(routeName, id); }}>
          <View style={componentStyles['menu__link']}>
            <Text>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView style={sharedStyles['fullsize']}>
        {menu.map((item, index) => {
          const items = [];

          const page = pages.data[item];
          const routeName = (page.appScreen) ? page.appScreen : 'Page';

          items.push(renderLink(routeName, page.title, item));

          return items;
        })}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  adverts: state.adverts,
  assets: state.assets,
  pages: state.pages,
  settings: state.settings,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
