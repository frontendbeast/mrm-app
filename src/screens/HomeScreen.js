import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import store from '../data/store';

import { getSettings } from '../actions/getSettings';

import Header from '../components/Header';
import ImageLoader from '../components/ImageLoader';
import Loading from '../components/Loading';
import PagesContainer from '../containers/PagesContainer';

import globalStyles from '../styles/Styles';
import { colors, dimensions } from '../styles/Variables';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { settings } = this.props;

    const renderGridItem = (page, id, index) => {
      const routeName = (page.appScreen) ? page.appScreen : 'Page';
      const width = (index === 0) ? '100%' : '50%';

      classGridItem = (index === 0) ? styles.homeGridItemFeature : styles.homeGridItem;
      classGridText = (index === 0) ? styles.homeGridTextFeature : styles.homeGridText;

      return (
        <TouchableOpacity key={id} onPress={() => { this.props.navigateTo(routeName, id); }} style={classGridItem}>
          <ImageLoader source={`https:${page.image.file.url}`} height={300} width={400} imgSize={325} style={styles.homeGridImage} resizeMode='cover' />
          <View>
            <Text style={classGridText}>{page.title.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    if(!settings || !settings.data) {
      return (
        <Loading />
      );
    }

    const homeGrid = settings.data[0][Object.keys(settings.data[0])[0]].homeGrid;
    const pageList = settings.data[1];

    return (
      <View style={globalStyles.fullsize}>
        <Header/>
        <ScrollView>
          <View style={styles.homeGrid}>
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
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
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

const styles = {
  homeGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  homeGridItem: {
    aspectRatio: 1.34,
    padding: dimensions.gutter,
    position: 'relative',
    width: '50%',
  },
  homeGridItemFeature: {
    aspectRatio: 1.34,
    justifyContent: 'flex-end',
    padding: dimensions.gutter * 2,
    position: 'relative',
    width: '100%',
  },
  homeGridImage: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  homeGridText: {
    alignSelf: 'flex-start',
    backgroundColor: colors.homeGridTextBG,
    color: colors.homeGridText,
    fontFamily: 'BebasNeue',
    fontSize: 20,
    letterSpacing: 0.5,
    paddingBottom: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 4,
  },
  homeGridTextFeature: {
    alignSelf: 'center',
    backgroundColor: colors.homeGridTextFeatureBG,
    color: colors.homeGridTextFeature,
    fontFamily: 'BebasNeue',
    fontSize: 40,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
  }
}
