import React from 'react';
import { Animated, Image, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import componentStyles from '../styles/loading';
import sharedStyles from '../styles/shared';
import { dimensions } from '../styles/variables';

export default class Loading extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      textMainOpacity: new Animated.Value(0),
      textSubOpacity: new Animated.Value(0),
    };

    if (this.props.textMain) {
      setTimeout(()=> {
        Animated.timing(this.state.textMainOpacity, {
          toValue: 1,
          duration: 250,
        }).start();
      }, 500);
    }

    if (this.props.textSub) {
      setTimeout(()=> {
        Animated.timing(this.state.textSubOpacity, {
          toValue: 1,
          duration: 250,
        }).start();
      }, 5500);
    }

  }

  render() {
    const { img, textMain, textSub } = this.props;
    const { textMainOpacity, textSubOpacity } = this.state;

    const image = (img) ? require('../assets/images/loading-img.gif') : require('../assets/images/loading.gif');
    const styles = [componentStyles['loading']];

    if (img) {
      styles.push(componentStyles['loading--img']);
    }

    return (
      <View style={styles}>
        <View style={componentStyles['loading__text']}>
          { textMain ? <Animated.Text style={[sharedStyles['tape--md'], componentStyles['loading__centered'], { opacity: textMainOpacity }]}>{textMain}</Animated.Text> : null }
          { textSub ? <Animated.Text style={[sharedStyles['tape--sm'], sharedStyles['tape--sm--highlight'], componentStyles['loading__centered'], { opacity: textSubOpacity }]}>{textSub}</Animated.Text> : null }
        </View>
        <Image source={image} style={componentStyles['loading__centered']} resizeMode="contain" />
      </View>
    );
  }
}
