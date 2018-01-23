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

});
