import React from 'react';
import { ScrollView, View } from 'react-native';
import PullToRefresh from 'react-native-simple-ptr';

import store from '../data/store';

import { getPageByID } from '../actions/getPages';

import Header from '../components/Header';
import PagesContainer from '../containers/PagesContainer';

import globalStyles from '../styles/Styles';

export default class PageScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={globalStyles.fullsize}>
        <Header/>
        <ScrollView contentContainerStyle={{minHeight: '100%'}}>
          <PagesContainer id={this.props.navigation.state.params.id} />
        </ScrollView>
      </View>
    );
  }
}
