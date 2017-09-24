import React from 'react';
import { Text, View } from 'react-native';

import { colors, dimensions } from '../styles/Variables';
import globalStyles from '../styles/Styles';

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
      return null;
    }

    const items = Object
      .entries(brotherClubs.data)
      .map(([id, club]) => { return { ...club, id: id }; })
      .sort((a, b) => { return Date.parse(b.name) - Date.parse(a.name); });

    return (
      <View style={globalStyles.fullsize}>
        <View>
          {items.map((club, index) => {
            return (
              <View key={club.id}>
                <Text>{ club.name }</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
