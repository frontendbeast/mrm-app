import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Markdown, { getUniqueID } from 'react-native-markdown-renderer';

import ImageLoader from './ImageLoader';
import Loading from './Loading';

import componentStyles from '../styles/page';
import sharedStyles from '../styles/shared';
import markdownStyles from '../styles/markdown';

const rules = {
  blockquote: (node, children, parent, styles) =>
    <View key={getUniqueID()} style={[markdownStyles.blockquote]}>
      <Image source={require('../assets/images/quote.png')} style={markdownStyles.blockquoteImg} resizeMode="contain" />
      <Text style={[markdownStyles.blockquoteText]}>
        {children}
      </Text>
    </View>,
  img: (node, children, parent, styles) => {
    return <ImageLoader key={getUniqueID()} source={node.attributes.src} style={componentStyles['page-image']} />;
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

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.scrollView;
  }

  componentDidUpdate() {
    if(this.scrollView) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: false});
    }
  }

  render() {
    const { assets, pages, id, title } = this.props;

    if (!pages || !pages.data || !assets || !assets.data) {
      return (
        <Loading />
      );
    }

    const data = pages.data[id];
    const image = assets.data[data.image];
    const page = Object.assign({}, data, { image: image });

    return (
      <View style={sharedStyles['fullsize']}>
        <ScrollView ref={ScrollView => this.scrollView = ScrollView}>
          <View key={id} style={[componentStyles['page-content']]}>
          {page.image ?
            <View>
              <View style={componentStyles['page-masthead__container']}>
                <View style={componentStyles['page-masthead__centered']}>
                  <Text style={componentStyles['page-masthead__text']}>{page.title.toUpperCase()}</Text>
                </View>
              </View>
              <ImageLoader source={`https:${page.image.file.url}`} width={page.image.file.details.image.width} height={page.image.file.details.image.height} />
            </View>
          : null}
            <View style={sharedStyles['container']}>
              {page.intro ?
                <View key={'blockQuote'} style={[markdownStyles.blockquote, markdownStyles.blockquoteAlt, componentStyles['page-masthead__blockquote']]}>
                  <Image source={require('../assets/images/quote-alt.png')} style={markdownStyles.blockquoteImg} resizeMode="contain" />
                  <Text style={[markdownStyles.blockquoteText, markdownStyles.blockquoteTextAlt]}>{page.intro}</Text>
                </View>
              : null}
              <Markdown style={markdownStyles} rules={rules}>{page.copy}</Markdown>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
