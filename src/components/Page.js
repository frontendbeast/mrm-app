import React from 'react';
import { Text, View } from 'react-native';

import globalStyles from '../styles/Styles';

export default class Page extends React.Component {
  componentWillMount() {
    if (this.props.title) {
      this.props.onGetPageByTitle(this.props.title);
    } else {
      this.props.onGetPages();
    }
  }

  render() {
    const { pages, title } = this.props;

    if ((pages.loading === undefined || pages.loading) && !pages.data) {
      return null;
    }

    return (
      <View style={globalStyles.container}>
        {Object.entries(pages.data).map(([id, page]) => {
          return (title && page.title !== title) ? false : <Text key={id}>{ page.copy }</Text>;
        })}
      </View>
    );
  }
}
