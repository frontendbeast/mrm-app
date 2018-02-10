import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import ImageLoader from './ImageLoader';
import Loading from './Loading';

import actionTypes from '../constants/actionTypes';

import { dimensions } from '../styles/variables';
import sharedStyles from '../styles/shared';
import componentStyles from '../styles/teamListing';

class TeamListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetPersons();
    this.props.onTrackScreenView('Team');
  }

  render() {
    const { assets, persons } = this.props;

    if (!assets || !assets.data || !persons || !persons.data) {
      return <Loading />;
    }

    const items = Object
      .entries(persons.data)
      .map(([id, person]) => {
        const photo = assets.data[person.photo];

        return Object.assign({}, person, { id, photo });
      })
      .sort((a, b) => { return Date.parse(b.name) - Date.parse(a.name); });

    return (
      <View style={sharedStyles['fullsize']}>
        <ScrollView>
          <View style={componentStyles['persons']}>
            {items.map((person, index) => {
              return (
                <TouchableOpacity
                  key={person.id}
                  style={componentStyles['person']}
                  onPress={() => { this.props.viewDetail(person.id); }}
                >
                  <ImageLoader source={`https:${person.photo.file.url}`} height={person.photo.file.details.image.height} width={person.photo.file.details.image.height} imgSize={dimensions.images.md} style={[sharedStyles['absolute-cover'], {opacity: 0.7}]} resizeMode='cover' />
                  <View style={componentStyles['person__link']}>
                    <View style={componentStyles['person__text']}>
                      <Text style={sharedStyles['tape--md']}>{ person.name }</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
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
  viewDetail: (id) =>
    dispatch(NavigationActions.navigate({ routeName: 'TeamDetail', params: { id: id } })),
    onTrackScreenView: (screen) => dispatch({ type: actionTypes.TrackScreenView, screen }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamListing);
