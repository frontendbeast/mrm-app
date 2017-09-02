import { connect } from 'react-redux';

import { getEventByID } from '../actions/getEvents';
import EventDetail from '../components/EventDetail';

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetEventByID: (id) => dispatch(getEventByID(id)),
   };
}

const EventDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetail);

export default EventDetailContainer;
