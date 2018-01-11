import { StyleSheet } from 'react-native';

import shared from './shared';
import  { colors, dimensions } from './variables';

export default StyleSheet.create({

  'page-content': {
    backgroundColor: colors.textBG,
  },

  'page-image': {
    marginLeft: -dimensions.gutter,
    marginRight: -dimensions.gutter,
  },

  'page-masthead__blockquote': {
    marginTop: -54,
  },

  'page-masthead__centered': {
    alignItems:'center',
    flex: 1,
  },

  'page-masthead__container': {
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },

  'page-masthead__text': {
    backgroundColor: '#fd0',
    color: '#222',
    fontFamily: 'BebasNeue',
    fontSize: 40,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 36,
  }

});
