import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'day': {
    backgroundColor: colors.eventListingGroupBG,
    padding: dimensions.gutter,
  },

  'day__name': {
    color: colors.eventListingGroupText,
    fontFamily: 'BebasNeue',
    fontSize: 18,
    letterSpacing: 0.5,
  },

  'event': {
    aspectRatio: 2.5,
    backgroundColor: colors.eventBG,
  },

  'event__link': {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: dimensions.gutter,
    position: 'relative',
  },

  'event__name': {
    color: colors.text,
    fontWeight: 'bold',
  },

  'event__separator': {
    backgroundColor: colors.eventBorder,
    bottom: 0,
    height: 1,
    left: 0,
    position: 'absolute',
    right: 0,
  },

  'event__text': {
    alignSelf: 'flex-end',
  }

});
