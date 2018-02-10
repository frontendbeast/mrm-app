import { connect } from 'react-redux';

import { getPersons } from '../actions/getPersons';

import TeamListing from '../components/TeamListing';

function mapStateToProps(state) {
  return {
    assets: state.assets,
    persons: state.persons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPersons: () => dispatch(getPersons()),
    onTrackScreenView: (screen) => dispatch({ type: actionTypes.TrackScreenView, screen }),
   };
}

const TeamListingContainer = connect(mapStateToProps, mapDispatchToProps)(TeamListing);

export default TeamListingContainer;
