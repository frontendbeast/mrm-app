import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { clearCache } from '../actions/clearCache';
import { getPersonByID } from '../actions/getPersons';

import Header from '../components/Header';
import TeamDetailContainer from '../containers/TeamDetailContainer';

import globalStyles from '../styles/Styles';

export default class TeamDetailScreen extends React.Component {
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
      .dispatch(clearCache('persons', 'id', this.props.navigation.state.params.id))
      .then(() => {
        store
          .dispatch(getPersonByID(this.props.navigation.state.params.id))
          .then(() => {
            this.setState({isRefreshing: false});
          });
      });
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header title="Team Details" back={true} />
        <PullToRefresh
          isRefreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
        >
          <ScrollView contentContainerStyle={{minHeight: '100%'}}>
            <TeamDetailContainer id={this.props.navigation.state.params.id} />
          </ScrollView>
        </PullToRefresh>
      </View>
    );
  }
}
