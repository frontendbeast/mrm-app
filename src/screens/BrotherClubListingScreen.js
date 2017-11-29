import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { getBrotherClubs } from '../actions/getBrotherClubs';

import Header from '../components/Header';
import BrotherClubListingContainer from '../containers/BrotherClubListingContainer';

import globalStyles from '../styles/Styles';

export default class BrotherClubListingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header/>
        <ScrollView contentContainerStyle={{minHeight: '100%'}}>
          <BrotherClubListingContainer/>
        </ScrollView>
      </View>
    );
  }
}
