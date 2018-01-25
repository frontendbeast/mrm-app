import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors } from './variables';

export default StyleSheet.create({

  'loading': {
    backgroundColor: colors.appBG,
    flex: 1,
    justifyContent: 'center',
  },

  'loading__centered': {
    alignSelf: 'center',
  },

});
