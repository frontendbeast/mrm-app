import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import ImageLoader from './ImageLoader';
import Loading from './Loading';

import sharedStyles from '../styles/shared';
import componentStyles from '../styles/teamListing';

class TeamListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetPersons();
  }

  render() {
    const { assets, persons } = this.props;

    if (!assets || !assets.data || !persons || !persons.data) {
      return <Loading />;
    }

    const items = Object
      .entries(persons.data)
      .map(([id, person]) => {
        const data = {
          ...person,
          id: id
        };

        data.photo = assets.data[person.photo];

        return data;
      })
      .sort((a, b) => { return Date.parse(b.name) - Date.parse(a.name); });

    return (
      <View style={sharedStyles['fullsize']}>
        <View style={componentStyles['persons']}>
          {items.map((person, index) => {
            return (
              <TouchableOpacity
                key={person.id}
                style={[componentStyles['person'], index === items.length - 1 && componentStyles['person--last']]}
                onPress={() => { this.props.viewDetail(person.id); }}
              >
                <View style={componentStyles['person__photo']}>
                  <ImageLoader source={`https:${person.photo.file.url}`} height={300} width={400} imgSize={325} />
                </View>
                <View style={componentStyles['person__link']}>
                  <Text style={componentStyles['person__name']}>{ person.name }</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamListing);
