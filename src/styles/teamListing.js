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
    width: '50%',
  },
  'person__link': {
    borderBottomWidth: 0,
    padding: dimensions.gutter,
  },
  'person__name': {
    fontWeight: 'bold',
  }

});
