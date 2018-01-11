import { StyleSheet } from 'react-native';

import  { colors } from './variables';

const markdownStyles = StyleSheet.create({
  blockquote: {
    marginTop: 24,
    position: 'relative',
  },
  blockquoteAlt: {
    marginBottom: 14,
  },
  blockquoteImg: {
    height: 13,
    left: 18,
    position: 'absolute',
    top: -6.5,
    width: 20,
    zIndex: 1,
  },
  blockquoteText: {
    backgroundColor: colors.textBG,
    color: colors.text,
    fontFamily: 'ZillaSlab-Italic',
    fontSize: 24,
    lineHeight: 34,
    paddingBottom: 24,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
  },
  blockquoteTextAlt: {
    backgroundColor: colors.text,
    color: colors.textBG,
  },
  em: {
    fontFamily: 'ZillaSlab-Italic',
  },
  block: {
    marginBottom: 12,
    marginTop: 12,
  },
  paragraph: {
    color: colors.text,
    fontFamily: 'ZillaSlab-Regular',
    fontSize: 18,
    lineHeight: 27,
    marginBottom: 8,
    marginTop: 8,
    paddingBottom: 2,
    paddingTop: 2,
  },
  strong: {
    fontFamily: 'ZillaSlab-SemiBold',
  },
});

module.exports = markdownStyles;
