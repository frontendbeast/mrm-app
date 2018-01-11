import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'header': {
    backgroundColor: '#000',
  },
  'header__container': {
    backgroundColor: colors.header,
    flexDirection: 'row',
  },
  'header__logo':{
    marginTop:  dimensions.gutter - 1,
    width: 150,
  },
  'header__nav-button': {
    alignSelf: 'flex-start',
    flex: 1,
    padding: dimensions.gutter,
    width: 30,
  },
  'header__spacer': {
    alignSelf: 'flex-end',
    flex: 1,
    padding: dimensions.gutter,
    width: 30,
  }

});
