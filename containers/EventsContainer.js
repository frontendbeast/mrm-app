import { connect } from 'react-redux';

import { getEvents } from '../actions/getEvents';
import Events from '../components/Events';

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

const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);

export default EventsContainer;
