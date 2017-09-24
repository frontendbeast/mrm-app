import React from 'react';
import { Text, View } from 'react-native';

import globalStyles from '../styles/Styles';

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

    if ((pages.loading === undefined || pages.loading) && !pages.data) {
      return null;
    }

    console.log(id, pages.data, pages.data[id]);

    return (
      <View style={globalStyles.container}>
        {Object.entries(pages.data).map(([pageID, page]) => {
          if (title && page.title !== title || id && pageID !== id ) {
            return false;
          }

          return (
            <View key={pageID}>
              <Text style={globalStyles.heading}>{ page.title }</Text>
              <Text>{ page.copy }</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
