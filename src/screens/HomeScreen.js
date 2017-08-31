import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { clearCache } from '../actions/clearCache';
import { getPageByTitle } from '../actions/getPages';

import Header from '../components/Header';
import PagesContainer from '../containers/PagesContainer';

import globalStyles from '../styles/Styles';

export default class HomeScreen extends React.Component {
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
      .dispatch(clearCache('pages', 'title', 'Home'))
      .then(() => {
        store
          .dispatch(getPageByTitle('Home'))
          .then(() => {
            this.setState({isRefreshing: false});
          });
      });
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header title="Welcome" />
        <PullToRefresh
          isRefreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
        >
          <ScrollView>
            <PagesContainer title="Home" />
          </ScrollView>
        </PullToRefresh>
      </View>
    );
  }
}
