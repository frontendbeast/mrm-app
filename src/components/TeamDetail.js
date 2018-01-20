import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ImageLoader from './ImageLoader';
import Loading from './Loading';

import sharedStyles from '../styles/shared';

class TeamDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { assets, persons, id } = this.props;

    if (!assets || !assets.data || !persons || !persons.data) {
      return <Loading />;
    }

    const photo = assets.data[persons.data[id].photo];
    const person = Object.assign({}, persons.data[id], { photo });

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

const mapStateToProps = state => ({
  assets: state.assets,
  persons: state.persons
});

const mapDispatchToProps = dispatch => ({  });

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);
