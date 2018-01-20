import { connect } from 'react-redux';

import { getBrotherClubs } from '../actions/getBrotherClubs';
import BrotherClubListing from '../components/BrotherClubListing';

function mapStateToProps(state) {
  return {
    assets: state.assets,
    brotherClubs: state.brotherClubs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetBrotherClubs: () => dispatch(getBrotherClubs()),
   };
}

const BrotherClubListingContainer = connect(mapStateToProps, mapDispatchToProps)(BrotherClubListing);

export default BrotherClubListingContainer;
