import React from 'react';
import { Provider } from 'react-redux';

import store from './data/store';

import AppNavigator from './navigators/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

console.ignoredYellowBox = ['Remote debugger'];
