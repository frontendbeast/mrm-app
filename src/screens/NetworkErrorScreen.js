import React from 'react';
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { sync } from '../actions/sync';

import Header from '../components/Header';
import Loading from '../components/Loading';

import componentStyles from '../styles/networkError';
import sharedStyles from '../styles/shared';
import markdownStyles from '../styles/markdown';

class NetworkErrorScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { settings, sync } = nextProps;

    if (!sync.error && settings && Object.keys(settings.data).length) {
      this.props.syncSuccess();
    }
  }

  render() {
    const { sync, onSync } = this.props;

    console.log(sync);

    if(sync && sync.loading) {
      return (
        <Loading textMain={'Loading content'} textSub={'Sorry it‘s taking a while'} />
      );
    }

    return (
      <View style={sharedStyles['fullsize']}>
        <Header/>
        <ImageBackground style={[sharedStyles['container'], componentStyles['networkError']]} source={require('../assets/images/error-bg.jpg')} resizeMode={'contain'}>
            <Text style={[sharedStyles['tape--xl'], componentStyles['networkError__top']]}>Connection fail</Text>
            <View>
              <Text style={[sharedStyles['subheading'], { textAlign: 'center' }]}>There was a problem getting {"\n"} the app content</Text>
              <Text style={[markdownStyles.paragraph, { textAlign: 'center' }]}>Make sure you’re connected to the internet and click below to give it another go.</Text>
            </View>
            <TouchableOpacity style={componentStyles['networkError__bottom']} onPress={ onSync }>
              <Text style={[sharedStyles['tape--lg']]}>Retry</Text>
            </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  sync: state.sync,
 });

const mapDispatchToProps = dispatch => ({
  syncSuccess: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Home' })),
  onSync: () => dispatch(sync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkErrorScreen);
