import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-renderer';

import ImageLoader from './ImageLoader';
import Loading from './Loading';

import actionTypes from '../constants/actionTypes';

import MarkdownHelper from '../helpers/MarkdownHelper';

import { dimensions } from '../styles/variables';
import sharedStyles from '../styles/shared';
import componentStyles from '../styles/teamDetail';
import markdownStyles from '../styles/markdown';

class TeamDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { persons, id, onTrackScreenView } = this.props;
    const person = persons.data[id];

    onTrackScreenView(`Team > ${person.name}`);
  }

  render() {
    const { assets, persons, id } = this.props;

    if (!assets || !assets.data || !persons || !persons.data) {
      return <Loading />;
    }

    const markdownHelper = new MarkdownHelper(assets.data, componentStyles);

    const photo = assets.data[persons.data[id].photo];
    const person = Object.assign({}, persons.data[id], { photo });

    return (
      <View style={sharedStyles['fullsize']}>
        <ScrollView>
          { person.photo ?
            <View style={{ aspectRatio: 1 }}>
              <ImageLoader source={`https:${person.photo.file.url}`} height={person.photo.file.details.image.height} width={person.photo.file.details.image.height} imgSize={dimensions.images.lg} style={sharedStyles['absoluteCover']} resizeMode='cover' />
            </View>
          : null }
          <View style={sharedStyles['container']}>
            <Text style={[sharedStyles['heading'], componentStyles['person__name']]}>{ person.name }</Text>
            { person.biography ?
            <Markdown style={markdownStyles} rules={markdownHelper.getRules()}>{person.biography}</Markdown>
            : null }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.assets,
  persons: state.persons
});

const mapDispatchToProps = dispatch => ({
  onTrackScreenView: (screen) => dispatch({ type: actionTypes.TrackScreenView, screen }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);
