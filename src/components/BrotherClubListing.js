import React from 'react';
import { Text, View } from 'react-native';

import Loading from './Loading';

import sharedStyles from '../styles/shared';

export default class BrotherClubListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetBrotherClubs();
  }

  render() {
    const { brotherClubs } = this.props;

    if ((brotherClubs.loading === undefined || brotherClubs.loading) && !brotherClubs.data) {
      return <Loading />;
    }

    const items = Object
      .entries(brotherClubs.data)
      .map(([id, club]) => { return { ...club, id: id }; })
      .sort((a, b) => { return Date.parse(b.name) - Date.parse(a.name); });

    return (
      <View style={sharedStyles['fullsize']}>
        <ScrollView>
          <View>
            {items.map((club, index) => {
              return (
                <View key={club.id}>
                  <Text>{ club.name }</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
