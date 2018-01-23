import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'header': {
    backgroundColor: colors.header,
  },

  'header__container': {
    backgroundColor: colors.header,
    flexDirection: 'row',
  },

  'header__logo':{
    alignSelf: 'center',
    flex: 1,
    height: 60,
  },

  'header__nav-button': {
    alignSelf: 'flex-start',
    flex: 1,
    height: 60,
  },

  'header__spacer': {
    alignSelf: 'flex-end',
    flex: 1,
  }

});
