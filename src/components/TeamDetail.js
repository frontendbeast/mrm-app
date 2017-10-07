import React from 'react';
import { Image, Text, View } from 'react-native';

import ImageLoader from './ImageLoader';

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
          <ImageLoader source={`https:${person.photo.file.url}`} height={300} width={400} />
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
