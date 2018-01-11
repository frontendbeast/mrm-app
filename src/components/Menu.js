import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, SafeAreaView } from 'react-navigation';

import { getSettings } from '../actions/getSettings';
import { sync } from '../actions/sync';

import sharedStyles from '../styles/shared';
import componentStyles from '../styles/menu';

class Menu extends React.Component {
  componentDidMount() {
    this.props.onGetSettings();
    this.props.onSync();
  }

  render () {
    const { settings } = this.props;

    if(!settings || !settings.data || !settings.data[0] || !Object.keys(settings.data[0]).length || !settings.data[1]) {
      return null;
    }

    const menu = settings.data[0][Object.keys(settings.data[0])[0]].menu;
    const pageList = settings.data[1];

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

          const page = pageList[item.sys.id];
          const routeName = (page.appScreen) ? page.appScreen : 'Page';

          items.push(renderLink(routeName, page.title, item.sys.id));

          return items;
        })}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
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
