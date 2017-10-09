import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { clearCache } from '../actions/clearCache';
import { getBrotherClubs } from '../actions/getBrotherClubs';

import Header from '../components/Header';
import BrotherClubListingContainer from '../containers/BrotherClubListingContainer';

import globalStyles from '../styles/Styles';

export default class BrotherClubListingScreen extends React.Component {
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
      .dispatch(clearCache('brotherClubs'))
      .then(() => {
        store
          .dispatch(getBrotherClubs())
          .then(() => {
            this.setState({isRefreshing: false});
          });
      });
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header/>
        <PullToRefresh
          isRefreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
        >
          <ScrollView contentContainerStyle={{minHeight: '100%'}}>
            <BrotherClubListingContainer/>
          </ScrollView>
        </PullToRefresh>
      </View>
    );
  }
}
