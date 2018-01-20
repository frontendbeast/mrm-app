import { connect } from 'react-redux';

import EventDetail from '../components/EventDetail';

function mapStateToProps(state) {
  return {
    assets: state.assets,
    events: state.events,
    venues: state.venues
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const EventDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetail);

export default EventDetailContainer;
