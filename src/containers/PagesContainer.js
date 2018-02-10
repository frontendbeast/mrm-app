import { connect } from 'react-redux';

import Page from '../components/Page';
import actionTypes from '../constants/actionTypes';

function mapStateToProps(state) {
  return {
    adverts: state.adverts,
    assets: state.assets,
    pages: state.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTrackScreenView: (screen) => dispatch({ type: actionTypes.TrackScreenView, screen }),
    onTrackAdvertView: (advert) => dispatch({ type: actionTypes.TrackAdvertView, advert }),
    onTrackAdvertClick: (advert) => dispatch({ type: actionTypes.TrackAdvertClick, advert }),
  };
}

const PagesContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PagesContainer;
