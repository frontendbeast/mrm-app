import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Header from '../components/Header';
import ImageLoader from '../components/ImageLoader';
import Loading from '../components/Loading';
import PagesContainer from '../containers/PagesContainer';

import AdvertsHelper from '../helpers/AdvertsHelper';

import sharedStyles from '../styles/shared';
import advertStyles from '../styles/advert';
import screenStyles from '../styles/homeScreen';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { adverts, assets, pages, settings } = this.props;

    const renderAdvert = (id) => {
      const assetID = adverts.data[id].image;
      const advert = Object.assign({}, adverts.data[id], { image: assets.data[assetID] });
      const aspectRatio = advert.image.file.details.image.width/advert.image.file.details.image.height;
      return (
        <TouchableOpacity key={id} onPress={() => { Linking.openURL(advert.link); }} style={[advertStyles['advert--banner'], { aspectRatio }]}>
          <ImageLoader source={`https:${advert.image.file.url}`} height={advert.image.file.details.image.height} width={advert.image.file.details.image.width} imgSize={900} style={sharedStyles['absolute-cover']} resizeMode='cover' />
        </TouchableOpacity>
      );
    };

    const renderGridItem = (page, id, index) => {
      const routeName = (page.appScreen) ? page.appScreen : 'Page';
      const width = (index === 0) ? '100%' : '50%';

      const classGridItem = (index === 0) ? screenStyles['home-grid__item--feature'] : screenStyles['home-grid__item'];
      const classGridText = (index === 0) ? sharedStyles['tape--lg'] : sharedStyles['tape--md'];

      const imgOpacity = (index === 0) ? 1 : 0.7;
      const imgSize = (index === 0) ? 900 : 450;

      return (
        <TouchableOpacity key={id} onPress={() => { this.props.navigateTo(routeName, id); }} style={classGridItem}>
          <ImageLoader source={`https:${page.image.file.url}`} height={page.image.file.details.image.height} width={page.image.file.details.image.height} imgSize={imgSize} style={[sharedStyles['absolute-cover'], {opacity: imgOpacity}]} resizeMode='cover' />
          <View>
            <Text style={classGridText}>{page.title}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    if(!assets || !assets.data || !pages || !pages.data || !settings || !settings.data || !Object.keys(settings.data).length) {
      return (
        <Loading />
      );
    }

    const advertsHelper = new AdvertsHelper(adverts.data);
    const advertSpacing = 4;
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

            const items = [renderGridItem(data, pageID, index)];

            if (index === 0 || index % advertSpacing == 0 && index !== homeGrid.length-1) {
              const ad = advertsHelper.getAdvert('banner');
              if (ad) {
                items.push(renderAdvert(ad));
              }
            } else if ( index === homeGrid.length-1 ) {
              const ad = advertsHelper.getAdvert('poster');
              if (ad) {
                items.push(renderAdvert(ad));
              }
            }

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
