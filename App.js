import React from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';

import store from './data/store';

import Header from './components/Header';
import EventsContainer from './containers/EventsContainer';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Header title="Welcome"/>
          <EventsContainer/>
        </View>
      </Provider>
    );
  }
}
