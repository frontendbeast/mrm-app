import { StyleSheet } from 'react-native';

import  { dimensions } from './Variables';

export default StyleSheet.create({

  container: {
    padding: dimensions.gutter,
  },

  fullsize: {
    flex: 1
  },

  heading: {
    fontSize: dimensions.fontSizeHeader,
    fontWeight: 'bold',
  },

});
