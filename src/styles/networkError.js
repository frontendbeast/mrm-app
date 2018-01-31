import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors } from './variables';

export default StyleSheet.create({

  'networkError': {
    backgroundColor: colors.appBG,
    flex: 1,
    justifyContent: 'space-between',
  },

  'networkError__bottom': {
    alignSelf: 'center',
    marginBottom: 40,
  },

  'networkError__top': {
    marginTop: 40,
  }

});
