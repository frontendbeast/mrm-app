import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { clearCache } from '../actions/clearCache';
import { getPageByID } from '../actions/getPages';

import Header from '../components/Header';
import PagesContainer from '../containers/PagesContainer';

import globalStyles from '../styles/Styles';

export default class PageScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });

    store
      .dispatch(clearCache('pages', 'id', this.props.navigation.state.params.id))
      .then(() => {
        store
          .dispatch(getPageByID(this.props.navigation.state.params.id))
          .then(() => {
            this.setState({isRefreshing: false});
          });
      });
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header title="Page" />
        <PullToRefresh
          isRefreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
        >
          <ScrollView>
            <PagesContainer id={this.props.navigation.state.params.id} />
          </ScrollView>
        </PullToRefresh>
      </View>
    );
  }
}
