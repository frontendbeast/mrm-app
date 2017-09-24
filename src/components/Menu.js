import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { getMenu } from '../actions/getMenu';

import { colors, dimensions } from '../styles/Variables';
import globalStyles from '../styles/Styles';

class Menu extends React.Component {
  componentDidMount() {
    this.props.onGetMenu();
  }

  render () {
    const { menu } = this.props;

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

    const menuItemsStatic =  [{
      routeName: 'Home',
      menuOrder: 0,
    },{
      routeName: 'Events',
      menuOrder: 10,
    },{
      routeName: 'Team',
      menuOrder: 20,
    },{
      routeName: 'Brother Clubs',
      menuOrder: 50,
    }];

    if (!menu.data) {
      menu.data = {};
    }

    return (
      <View style={[globalStyles.fullsize, styles.menu]}>
        {menuItemsStatic.map((itemStatic, index) => {
          const next = (index < menuItemsStatic.length-1) ? index + 1 : false;
          const items = [];

          items.push(renderLink(itemStatic.routeName));

          Object.entries(menu.data).map(([id, itemDynamic]) => {
            if (itemDynamic.menuOrder > itemStatic.menuOrder && (!next || itemDynamic.menuOrder < menuItemsStatic[next].menuOrder)) {
              items.push(renderLink('Page', itemDynamic.title, id));
            }
          });

          return items;
        })}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  menu: state.menu,
});

const mapDispatchToProps = dispatch => ({
  onGetMenu: () => dispatch(getMenu()),
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
