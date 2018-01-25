import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'person': {
    aspectRatio: 2.5,
    backgroundColor: colors.eventBG,
  },

  'person__name': {
    color: colors.text,
  },

});
