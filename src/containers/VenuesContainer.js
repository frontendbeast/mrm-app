import { connect } from 'react-redux';

import { getVenues } from '../actions/getVenues';
import Venues from '../components/Venues';

function mapStateToProps(state) {
  return {
    venues: state.venues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetVenues: () => dispatch(getVenues()),
   };
}

const VenuesContainer = connect(mapStateToProps, mapDispatchToProps)(Venues);

export default VenuesContainer;
