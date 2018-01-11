import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'day': {
    backgroundColor: colors.listItemHeader,
    padding: dimensions.gutter,
  },
  'day__name': {
    color: colors.listItemHeaderText,
    fontWeight: 'bold',
  },
  'event': {
    borderBottomColor: colors.listItemBorder,
    borderBottomWidth: 0.5,
  },
  'event--last': {
    borderBottomWidth: 0,
  },
  'event__link': {
    borderBottomWidth: 0,
    padding: dimensions.gutter,
  },
  'event__name': {
    color: colors.listItemText,
    fontWeight: 'bold',
  }

});
