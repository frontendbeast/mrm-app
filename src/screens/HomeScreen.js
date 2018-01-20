import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

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
    const { assets, pages, settings } = this.props;

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

    if(!assets || !assets.data || !pages || !pages.data || !settings || !settings.data || !Object.keys(settings.data).length) {
      return (
        <Loading />
      );
    }

    const homeGrid = settings.data[Object.keys(settings.data)[0]].homeGrid;

    return (
      <View style={[sharedStyles['app'], sharedStyles['fullsize']]}>
        <Header/>
        <ScrollView>
          <View style={screenStyles['home-grid']}>
          {homeGrid.map((pageID, index) => {
            const page = pages.data[pageID];
            const image = assets.data[page.image];
            const data = Object.assign({}, page, { image: image });

            return renderGridItem(data, pageID, index);
          })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.assets,
  pages: state.pages,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
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
