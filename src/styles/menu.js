import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'menu': {
    backgroundColor: colors.appBG,
  },

  'menu__link': {
    padding: dimensions.gutter,
  },

  'menu__text': {
    color: colors.text,
  }

});
