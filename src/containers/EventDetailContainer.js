import { connect } from 'react-redux';

import EventDetail from '../components/EventDetail';

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const EventDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetail);

export default EventDetailContainer;
