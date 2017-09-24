import React from 'react';
import { Image, Text, View } from 'react-native';

import { colors, dimensions } from '../styles/Variables';
import globalStyles from '../styles/Styles';

export default class TeamDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetPersonByID(this.props.id);
  }

  render() {
    const { persons, id } = this.props;

    if ((persons.loading === undefined || persons.loading) && !persons.data) {
      return null;
    }

    const person = persons.data[id];

    return (
      <View>
        { person.photo.file ?
        <View style={{ paddingTop: '56.666666%' }}>
          <Image style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} source={{ uri: `https:${person.photo.file.url}?w=900&fit=scale` }} resizeMode="cover" />
        </View>
        : null }
        <View style={globalStyles.container}>
          <Text style={globalStyles.heading}>{ person.name }</Text>
          <Text>{ person.biography }</Text>
        </View>
      </View>
    );
  }
}

const styles = {

};
