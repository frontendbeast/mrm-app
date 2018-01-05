import { connect } from 'react-redux';

import TeamDetail from '../components/TeamDetail';

function mapStateToProps(state) {
  return {
    persons: state.persons,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const TeamDetailContainer = connect(mapStateToProps, mapDispatchToProps)(TeamDetail);

export default TeamDetailContainer;
