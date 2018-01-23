import React from 'react';
import { connect } from 'react-redux';
import { Animated, Image, View, ViewPropTypes } from 'react-native';
import { CachedImage } from 'react-native-img-cache';

import PropTypes from 'prop-types';

export default class ImageLoader extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    imgSize: PropTypes.number,
    resizeMode: PropTypes.string,
    source: PropTypes.string.isRequired,
    style: ViewPropTypes.style,
    width: PropTypes.number,
  };

  static defaultProps = {
    backgroundColor: '#666',
    height: 0,
    imgSize: 650,
    resizeMode: 'cover',
    style: {},
    width: 0,
  };

  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      height: this.props.height,
      opacityLarge: new Animated.Value(0),
      opacityThumb: new Animated.Value(0),
      width: this.props.width,
    };

    this.imgSizeThumb = Math.round(this.props.imgSize/10);
  }

  componentDidMount() {
    this._isMounted = true;

    this.loadTimeLarge = new Date();
    this.loadTimeThumb = new Date();

    if(!this.state.width && !this.state.height) {
      Image.getSize(`${this.props.source}?fm=jpg&q=1&w=${this.imgSizeThumb}`, (width, height) => {
        if (this._isMounted) {
          this.setState({
            height: height,
            width: width,
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadLarge = (event) => {
    const now = new Date();
    const duration = (now - this.loadTimeLarge > 200) ? 250 : 0;

    Animated.timing(this.state.opacityLarge, {
      toValue: 1,
      duration: duration,
    }).start();
  }

  onLoadThumb = (event) => {
    const now = new Date();
    const duration = (now - this.loadTimeThumb > 200) ? 250 : 0;

    Animated.timing(this.state.opacityThumb, {
      toValue: 1,
      duration: duration,
    }).start();
  }

  render() {
    const { height, opacityThumb, opacityLarge, width } = this.state;
    const { backgroundColor, imgSize, resizeMode, source, style } = this.props;

    const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage);

    return (
      <View style={[{ backgroundColor: backgroundColor, aspectRatio: width/height, position: 'relative'}, style]}>
        <AnimatedCachedImage style={[styles['image'], {opacity: opacityThumb}]} resizeMode={resizeMode} source={{ uri: `${source}?fm=jpg&q=40&w=${this.imgSizeThumb}` }} onLoad={this.onLoadThumb} blurRadius={1}/>
        <AnimatedCachedImage style={[styles['image'], {opacity: opacityLarge}]} resizeMode={resizeMode} source={{ uri: `${source}?fm=jpg&q=70&w=${imgSize}` }} onLoad={this.onLoadLarge}/>
      </View>
    );
  }
}

const styles = {
  'image': {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  }
}
