import { connect } from 'react-redux';

import { getPersons } from '../actions/getPersons';
import TeamListing from '../components/TeamListing';

function mapStateToProps(state) {
  return {
    persons: state.persons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPersons: () => dispatch(getPersons()),
   };
}

const TeamListingContainer = connect(mapStateToProps, mapDispatchToProps)(TeamListing);

export default TeamListingContainer;
