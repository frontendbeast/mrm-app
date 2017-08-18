import React from 'react';
import { ListView, Text, View } from 'react-native';
import * as Firebase from 'firebase';

import Header from './components/Header';

const firebase = Firebase.initializeApp({
  databaseURL: 'https://mrm-app.firebaseio.com/',
});

const firebaseRef = firebase.database().ref();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      venues: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };

    this.eventsRef = firebaseRef.child('events');
    this.venuesRef = firebaseRef.child('venues');

  }

  componentDidMount() {
    this._listenForVenues(this.eventsRef);
    this._listenForVenues(this.venuesRef);
  }

  render() {
    return (
      <View>
         <Header title="Welcome"/>
         <ListView
          dataSource={this.state.venues}
          renderRow={this._renderItem.bind(this)}/>
      </View>
    );
  }

  _listenForVenues(venuesRef) {
    venuesRef.on('value', (dataSnapshot) => {
      var venues = [];
      
      dataSnapshot.forEach((child) => {
        venues.push({
          name: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        venues: this.state.venues.cloneWithRows(venues)
      });
    });
  }

  _renderItem(task) {
    return (
      <Text>{ task.name }</Text>
    );
  }
}
