import { connect } from 'react-redux';

import { getEvents } from '../actions/getEvents';
import { getVenues } from '../actions/getVenues';

import EventListing from '../components/EventListing';

import actionTypes from '../constants/actionTypes';

function mapStateToProps(state) {
  return {
    assets: state.assets,
    events: state.events,
    venues: state.venues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetEvents: () => dispatch(getEvents()),
    onGetVenues: () => dispatch(getVenues()),
    onTrackScreenView: (screen) => dispatch({ type: actionTypes.TrackScreenView, screen }),
   };
}

const EventListingContainer = connect(mapStateToProps, mapDispatchToProps)(EventListing);

export default EventListingContainer;
