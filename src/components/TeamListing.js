import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { colors, dimensions } from '../styles/Variables';
import globalStyles from '../styles/Styles';

class TeamListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onGetPersons();
  }

  render() {
    const { persons } = this.props;

    if ((persons.loading === undefined || persons.loading) && !persons.data) {
      return null;
    }

    const items = Object
      .entries(persons.data)
      .map(([id, person]) => { return { ...person, id: id }; })
      .sort((a, b) => { return Date.parse(b.name) - Date.parse(a.name); });

    return (
      <View style={globalStyles.fullsize}>
        <View style={styles.persons}>
          {items.map((person, index) => {
            return (
              <TouchableOpacity
                key={person.id}
                style={[styles.person, index === items.length - 1 && styles['person--last']]}
                onPress={() => { this.props.viewDetail(person.id); }}
              >
                <View style={styles.person__photo}>
                  <Image style={styles.person__image} source={{uri: `https:${person.photo.file.url}?w=300&fit=scale`}} resizeMode="cover" />
                </View>
                <View style={styles.person__link}>
                  <Text style={styles.person__name}>{ person.name }</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({  });

const mapDispatchToProps = dispatch => ({
  viewDetail: (id) =>
    dispatch(NavigationActions.navigate({ routeName: 'TeamDetail', params: { id: id } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamListing);

const styles = {
  'persons': {
    flex: 1,
    flexDirection: 'row',
  },
  'person': {
    width: '50%',
  },
  'person__image': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  'person__link': {
    borderBottomWidth: 0,
    padding: dimensions.gutter,
  },
  'person__photo': {
    paddingTop: '100%',
  },
  'person__name': {
    fontWeight: 'bold',
  }
};
