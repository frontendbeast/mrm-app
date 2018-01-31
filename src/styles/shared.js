import { StyleSheet } from 'react-native';

import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'absolute-cover': {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  'app': {
    backgroundColor: colors.appBG,
  },

  'container': {
    padding: dimensions.gutter,
  },

  'content': {
    backgroundColor: colors.textBG,
  },

  'fullsize': {
    flex: 1
  },

  'heading': {
    fontFamily: 'BebasNeue',
    fontSize: 40,
    letterSpacing: 1,
  },

  'subheading': {
    color: colors.text,
    fontFamily: 'BebasNeue',
    fontSize: 24,
    letterSpacing: 1,
  },

  'tape--xl': {
    alignSelf: 'center',
    backgroundColor: colors['tapeFeatureBG'],
    color: colors['tapeFeatureText'],
    fontFamily: 'BebasNeue',
    fontSize: 40,
    letterSpacing: 1,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
  },

  'tape--lg': {
    alignSelf: 'center',
    backgroundColor: colors['tapeBG'],
    color: colors['tapeText'],
    fontFamily: 'BebasNeue',
    fontSize: 30,
    letterSpacing: 0.5,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
  },

  'tape--md': {
    alignSelf: 'flex-start',
    backgroundColor: colors['tapeBG'],
    color: colors['tapeText'],
    fontFamily: 'BebasNeue',
    fontSize: 20,
    letterSpacing: 0.5,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 4,
  },

  'tape--sm': {
    alignSelf: 'flex-start',
    backgroundColor: colors['tapeInverseBG'],
    color: colors['tapeInverseText'],
    fontFamily: 'BebasNeue',
    fontSize: 18,
    letterSpacing: 0.5,
    marginTop: 5,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 4,
  },

  'tape--sm--inverse': {
    backgroundColor: colors['tapeBG'],
    color: colors['tapeText'],
  },

  'tape--sm--highlight': {
    backgroundColor: colors['tapeHighlightBG'],
    color: colors['tapeHighlightText'],
  }

});
