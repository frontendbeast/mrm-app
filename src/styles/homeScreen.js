import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'home-grid': {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

  'home-grid__item': {
    aspectRatio: 1.29,
    padding: dimensions.gutter,
    position: 'relative',
    width: '50%',
  },

  'home-grid__item--feature': {
    aspectRatio: 1.29,
    justifyContent: 'flex-end',
    padding: dimensions.gutter * 2,
    position: 'relative',
    width: '100%',
  },

  'home-grid__text': {
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

  'home-grid__text--feature': {
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

});
