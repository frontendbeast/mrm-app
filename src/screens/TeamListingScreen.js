import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { getPersons } from '../actions/getPersons';

import Header from '../components/Header';
import TeamListingContainer from '../containers/TeamListingContainer';

import globalStyles from '../styles/Styles';

export default class TeamListingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header/>
        <ScrollView contentContainerStyle={{minHeight: '100%'}}>
          <TeamListingContainer/>
        </ScrollView>
      </View>
    );
  }
}
