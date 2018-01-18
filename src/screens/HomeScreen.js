import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import store from '../data/store';

import { getAdverts } from '../actions/getAdverts';
import { getSettings } from '../actions/getSettings';

import Header from '../components/Header';
import ImageLoader from '../components/ImageLoader';
import Loading from '../components/Loading';
import PagesContainer from '../containers/PagesContainer';

import sharedStyles from '../styles/shared';
import screenStyles from '../styles/homeScreen';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { adverts, settings } = this.props;

    const renderGridItem = (page, id, index) => {
      const routeName = (page.appScreen) ? page.appScreen : 'Page';
      const width = (index === 0) ? '100%' : '50%';

      classGridItem = (index === 0) ? screenStyles['home-grid__item--feature'] : screenStyles['home-grid__item'];
      classGridText = (index === 0) ? screenStyles['home-grid__text--feature'] : screenStyles['home-grid__text'];

      return (
        <TouchableOpacity key={id} onPress={() => { this.props.navigateTo(routeName, id); }} style={classGridItem}>
          <ImageLoader source={`https:${page.image.file.url}`} height={300} width={400} imgSize={325} style={sharedStyles['absolute-cover']} resizeMode='cover' />
          <View>
            <Text style={classGridText}>{page.title.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    console.log('adverts', adverts);

    if(!settings || !settings.data || !settings.data[0] || !Object.keys(settings.data[0]).length || !settings.data[1] || !adverts || !adevrts.data) {
      return (
        <Loading />
      );
    }

    const homeGrid = settings.data[0][Object.keys(settings.data[0])[0]].homeGrid;
    const pageList = settings.data[1];

    return (
      <View style={[sharedStyles['app'], sharedStyles['fullsize']]}>
        <Header/>
        <ScrollView>
          <View style={screenStyles['home-grid']}>
          {homeGrid.map((item, index) => {
            const items = [];

            items.push(renderGridItem(pageList[item.sys.id], item.sys.id, index));

            return items;
          })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  adverts: state.adverts,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  onGetAdverts: () => dispatch(getAdverts()),
  onGetSettings: () => dispatch(getSettings()),
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
