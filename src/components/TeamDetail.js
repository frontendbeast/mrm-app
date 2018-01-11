import React from 'react';
import { Image, Text, View } from 'react-native';

import ImageLoader from './ImageLoader';
import Loading from './Loading';

import sharedStyles from '../styles/shared';

export default class TeamDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { persons, id } = this.props;

    if ((persons.loading === undefined || persons.loading) && !persons.data) {
      return <Loading />;
    }

    const person = persons.data[id];

    return (
      <View>
        { person.photo.file ?
          <ImageLoader source={`https:${person.photo.file.url}`} height={300} width={400} />
        : null }
        <View style={sharedStyles['container']}>
          <Text style={sharedStyles['heading']}>{ person.name }</Text>
          <Text>{ person.biography }</Text>
        </View>
      </View>
    );
  }
}
