import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { getSettings, getSettingsCache } from '../actions/getSettings';

import { colors, dimensions } from '../styles/Variables';
import globalStyles from '../styles/Styles';

class Menu extends React.Component {
  componentDidMount() {
    this.props.onGetSettings();
    this.props.onGetSettingsCache();
  }

  render () {
    const { settings } = this.props;

    if(!settings || !settings.data) {
      return null;
    }

    const config = Object.entries(settings.data[1])[0][1];
    const pageList = settings.data[0];

    const renderLink = (routeName, title, id) => {
      const key = (id) ? id : Math.floor(Math.random() * (100000 + 1));

      return (
        <TouchableOpacity key={key} onPress={() => { this.props.navigateTo(routeName, id); }}>
          <View style={styles.menu__link}>
            <Text>{ title ? title : routeName }</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={[globalStyles.fullsize, styles.menu]}>
        {config.menu.map((item, index) => {
          const items = [];

          const page = pageList[item.sys.id];
          const routeName = (page.appScreen) ? page.appScreen : 'Page';

          items.push(renderLink(routeName, page.title, item.sys.id));

          return items;
        })}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  onGetSettings: () => dispatch(getSettings()),
  onGetSettingsCache: () => dispatch(getSettingsCache()),
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

const styles = {
  'menu': {
    paddingTop: dimensions.gutter,
  },
  'menu__link': {
    padding: dimensions.gutter,
  }
};
