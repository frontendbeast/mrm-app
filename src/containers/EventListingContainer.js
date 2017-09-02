import { connect } from 'react-redux';

import { getEvents } from '../actions/getEvents';
import EventListing from '../components/EventListing';

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetEvents: () => dispatch(getEvents()),
   };
}

const EventListingContainer = connect(mapStateToProps, mapDispatchToProps)(EventListing);

export default EventListingContainer;
