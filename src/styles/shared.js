import { StyleSheet } from 'react-native';

import  { colors, dimensions } from './variables';

export default StyleSheet.create({

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
    fontSize: dimensions.fontSizeHeader,
    fontWeight: 'bold',
  },

  'absolute-cover': {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

});
