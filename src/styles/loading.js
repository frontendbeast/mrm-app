import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors } from './variables';

export default StyleSheet.create({

  'loading': {
    backgroundColor: colors.appBG,
    flex: 1,
    justifyContent: 'center',
  },

  'loading--img': {
    backgroundColor: colors.imageBG,
  },

  'loading__centered': {
    alignSelf: 'center',
  },

  'loading__text': {
    alignSelf: 'center',
    height: 120,
    justifyContent: 'space-between',
    position: 'absolute',
  }

});
