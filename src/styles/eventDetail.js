import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'event': {
    aspectRatio: 2.5,
    backgroundColor: colors.eventBG,
  },

  'event__location': {
    color: colors.text,
    fontFamily: 'ZillaSlab-SemiBold',
    fontSize: 18,
    marginBottom: dimensions.gutter,
    marginTop: dimensions.gutter,
  },

  'event__meta': {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: dimensions.gutter,
    marginTop: dimensions.gutter/2,
  },

  'event__meta-item': {
    marginRight: 5,
  },

  'event__name': {
    color: colors.text,
  },

  'event__time-place': {
    color: colors.text,
    fontFamily: 'ZillaSlab-SemiBold',
    fontSize: 18,
  },

});
