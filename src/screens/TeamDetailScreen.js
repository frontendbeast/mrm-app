import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { getPersonByID } from '../actions/getPersons';

import Header from '../components/Header';
import TeamDetailContainer from '../containers/TeamDetailContainer';

import globalStyles from '../styles/Styles';

export default class TeamDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header back={true}/>
        <ScrollView contentContainerStyle={{minHeight: '100%'}}>
          <TeamDetailContainer id={this.props.navigation.state.params.id} />
        </ScrollView>
      </View>
    );
  }
}
