import React from 'react';
import { View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { getPages } from '../actions/getPages';

import Header from '../components/Header';
import PagesContainer from '../containers/PagesContainer';

import sharedStyles from '../styles/shared';

export default class PageScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[sharedStyles['app'], sharedStyles['fullsize']]}>
        <Header/>
        <PagesContainer id={this.props.navigation.state.params.id} />
      </View>
    );
  }
}
