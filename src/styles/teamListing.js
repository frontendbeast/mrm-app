import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'persons': {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

  'person': {
    aspectRatio: 1,
    position: 'relative',
    width: '50%',
  },

  'person__link': {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: dimensions.gutter,
  },

});
