import { connect } from 'react-redux';

import { getEvents } from '../actions/getEvents';
import { getVenues } from '../actions/getVenues';
import Events from '../components/Events';

function mapStateToProps(state) {
  return {
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

const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);

export default EventsContainer;
