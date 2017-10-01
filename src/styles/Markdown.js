import { StyleSheet } from 'react-native';

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
  },
  blockquoteText: {
    fontFamily: 'ZillaSlab-Italic',
    fontSize: 24,
    lineHeight: 34,
    paddingBottom: 24,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
  },
  blockquoteTextAlt: {
    backgroundColor: '#222',
    color: '#fff',
  },
  em: {
    fontFamily: 'ZillaSlab-Italic',
  },
  block: {
    marginBottom: 12,
    marginTop: 12,
  },
  paragraph: {
    color: '#222',
    fontFamily: 'ZillaSlab-Regular',
    fontSize: 18,
    lineHeight: 27,
    marginBottom: 12,
    marginTop: 12,
  },
  strong: {
    fontFamily: 'ZillaSlab-SemiBold',
  },
});

module.exports = markdownStyles;
