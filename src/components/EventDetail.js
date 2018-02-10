import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-renderer';
import Moment from 'moment';

import ImageLoader from './ImageLoader';

import actionTypes from '../constants/actionTypes';

import MarkdownHelper from '../helpers/MarkdownHelper';

import { dimensions } from '../styles/variables';
import componentStyles from '../styles/eventDetail';
import sharedStyles from '../styles/shared';
import markdownStyles from '../styles/markdown';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { events, id, onTrackScreenView } = this.props;
    const event = events.data[id];

    onTrackScreenView(`Events > ${event.name}`);
  }

  render() {
    const { assets, events, id, venues } = this.props;

    if (!assets || !assets.data || !events || !events.data) {
      return null;
    }

    const markdownHelper = new MarkdownHelper(assets.data, componentStyles);

    const venue = venues.data[events.data[id].venue];
    const imageDetail = assets.data[events.data[id].imageDetail];
    const event = Object.assign({}, events.data[id], { venue, imageDetail });

    return (
      <View style={sharedStyles['fullsize']}>
        <ScrollView>
          {event.imageDetail ?
          <ImageLoader source={`https:${event.imageDetail.file.url}`} height={event.imageDetail.file.details.image.height} width={event.imageDetail.file.details.image.height} imgSize={dimensions.images.lg} resizeMode='cover' />
          : null }
          <View style={sharedStyles['container']}>
            <Text style={[sharedStyles['heading'], componentStyles['event__name']]}>{ event.name }</Text>
            <Text style={componentStyles['event__time-place']}>{ Moment(event.date).format('ddd, h:mm') } @ { event.venue ? event.venue.name : 'TBC' }</Text>
            { event.entryPrefix || event.entry || event.dressCode ?
            <View style={componentStyles['event__meta']}>
              <Text style={[sharedStyles['tape--sm'], sharedStyles['tape--sm--highlight'], componentStyles['event__meta-item']]}>{ event.entryPrefix ? event.entryPrefix : null }{ event.entry ? event.entry : null }</Text>
              { event.dressCode ? <Text style={[sharedStyles['tape--sm'], sharedStyles['tape--sm--inverse'], componentStyles['event__meta-item']]}>{ event.dressCode }</Text> : null }
            </View> : null }
            { event.details ?
            <Markdown style={markdownStyles} rules={markdownHelper.getRules()}>{event.details}</Markdown>
            : null }
            { event.venue.location ?
            <View>
              <Text style={componentStyles['event__location']}>Location</Text>
              <View style={{ aspectRatio: 1.666667, position: 'relative' }}>
                <Image style={sharedStyles['absolute-cover']} source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=53.4773871,-2.2371085&zoom=17&scale=1&size=600x340&maptype=roadmap&format=png&visual_refresh=true&markers=icon:https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-64.png%7C${event.venue.location.lat},+${event.venue.location.lon}` }} resizeMode="cover" />
              </View>
            </View>
            : null }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.assets,
  events: state.events,
  venues: state.venues
 });

const mapDispatchToProps = dispatch => ({
  onTrackScreenView: (screen) => dispatch({ type: actionTypes.TrackScreenView, screen }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);

