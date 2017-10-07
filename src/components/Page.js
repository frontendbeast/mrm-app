import React from 'react';
import { Image, Text, View } from 'react-native';
import Markdown, {getUniqueID} from 'react-native-markdown-renderer';

import ImageLoader from './ImageLoader';

import globalStyles from '../styles/Styles';
import markdownStyles from '../styles/Markdown';

export default class Page extends React.Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.onGetPageByID(this.props.id);
    } else if (this.props.title) {
      this.props.onGetPageByTitle(this.props.title);
    } else {
      this.props.onGetPages();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id && nextProps.id !== this.props.id) {
      this.props.onGetPageByID(nextProps.id);
    } else if (nextProps.title && nextProps.title !== this.props.title) {
      this.props.onGetPageByTitle(nextProps.title);
    }
  }

  render() {
    const { pages, id, title } = this.props;

    const rules = {
      blockquote: (node, children, parent, styles) =>
        <View key={getUniqueID()} style={[markdownStyles.blockquote]}>
          <Image source={require('../assets/images/quote.png')} style={markdownStyles.blockquoteImg} resizeMode="contain" />
          <Text style={[markdownStyles.blockquoteText]}>
            {children}
          </Text>
        </View>,
      img: (node, children, parent, styles) => {
        return <ImageLoader key={getUniqueID()} source={node.attributes.src} style={{marginLeft: -16, marginRight: -16}} />;
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

    if ((pages.loading === undefined || pages.loading) && !pages.data) {
      return null;
    }

    return (
      <View>
        {Object.entries(pages.data).map(([pageID, page]) => {
          if (title && page.title !== title || id && pageID !== id ) {
            return false;
          }

          return (
            <View key={pageID}>
            {page.image ?
              <View>
                <View style={{position: 'absolute', left: 0, right: 0, zIndex: 1}}>
                  <View style={{flex: 1, alignItems:'center'}}>
                    <Text style={{backgroundColor: '#fd0', fontFamily: 'norwester', fontSize: 40, paddingBottom: 10, paddingLeft: 15, paddingRight: 15, paddingTop: 10, marginTop: 36}}>{page.title.toUpperCase()}</Text>
                  </View>
                </View>
                <ImageLoader source={`https:${page.image.file.url}`} width={page.image.file.details.image.width} height={page.image.file.details.image.height} />
              </View>
            : null}
              <View style={globalStyles.container}>
                {page.intro ?
                  <View key={'blockQuote'} style={[markdownStyles.blockquote, markdownStyles.blockquoteAlt, {marginTop: -54}]}>
                    <Image source={require('../assets/images/quote-alt.png')} style={[markdownStyles.blockquoteImg, {zIndex: 1}]} resizeMode="contain" />
                    <Text style={[markdownStyles.blockquoteText, markdownStyles.blockquoteTextAlt]}>{page.intro}</Text>
                  </View>
                : null}
                <Markdown style={markdownStyles} rules={rules}>{ page.copy }</Markdown>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
