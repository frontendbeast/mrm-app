import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { getUniqueID } from 'react-native-markdown-renderer';

import ImageLoader from '../components/ImageLoader';

import { dimensions } from '../styles/variables';
import markdownStyles from '../styles/markdown';

export default class MarkdownHelper {
  constructor(assets, componentStyles) {
    this.assets = assets;
    this.componentStyles = componentStyles;
  }

  getRules() {
    return {
      blockquote: (node, children, parent, styles) =>
        <View key={getUniqueID()} style={[markdownStyles.blockquote]}>
          <Image source={require('../assets/images/quote.png')} style={markdownStyles.blockquoteImg} resizeMode="contain" />
          <Text style={[markdownStyles.blockquoteText]}>
            {children}
          </Text>
        </View>,
      img: (node, children, parent, styles) => {
        const asset = Object.entries(this.assets).filter(([id, image]) => {
          return `https:${image.file.url}` === node.attributes.src;
        });

        const height = (asset.length) ? asset[0][1].file.details.image.height : null;
        const width = (asset.length) ? asset[0][1].file.details.image.width : null;

        return <ImageLoader key={getUniqueID()} source={node.attributes.src} style={this.componentStyles['page-image']} height={height} width={width} imgSize={dimensions.images.lg} />;
      },
      p: (node, children, parent, styles) => {
        const style = (parent.length && parent[0].type === 'blockquote') ? [] : [markdownStyles.paragraph];

        return (children[0].type.displayName === 'Text' ?
        <Text key={getUniqueID()} style={style}>
          {children}
        </Text> :
        <View key={getUniqueID()} style={[markdownStyles.block]}>
          {children}
        </View>);
      },
    };
  };


}

