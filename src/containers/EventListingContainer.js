import { connect } from 'react-redux';

import { getEvents } from '../actions/getEvents';
import { getVenues } from '../actions/getVenues';
import EventListing from '../components/EventListing';

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
   };
}

const EventListingContainer = connect(mapStateToProps, mapDispatchToProps)(EventListing);

export default EventListingContainer;
