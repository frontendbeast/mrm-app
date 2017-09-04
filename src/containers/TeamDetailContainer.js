import { connect } from 'react-redux';

import { getPersonByID } from '../actions/getPersons';
import TeamDetail from '../components/TeamDetail';

function mapStateToProps(state) {
  return {
    persons: state.persons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPersonByID: (id) => dispatch(getPersonByID(id)),
   };
}

const TeamDetailContainer = connect(mapStateToProps, mapDispatchToProps)(TeamDetail);

export default TeamDetailContainer;
