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
      <View style={[sharedStyles['app'], sharedStyles['fullsize']]}>
        <Header back={true}/>
        <TeamDetailContainer id={this.props.navigation.state.params.id} />
      </View>
    );
  }
}
