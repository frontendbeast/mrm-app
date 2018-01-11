import React from 'react';
import { ScrollView, View } from 'react-native';

import Header from '../components/Header';
import TeamDetailContainer from '../containers/TeamDetailContainer';

import sharedStyles from '../styles/shared';

export default class TeamDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[sharedStyles['content'], sharedStyles['fullsize']]}>
        <Header back={true}/>
        <ScrollView contentContainerStyle={sharedStyles['fullsize']}>
          <TeamDetailContainer id={this.props.navigation.state.params.id} />
        </ScrollView>
      </View>
    );
  }
}
