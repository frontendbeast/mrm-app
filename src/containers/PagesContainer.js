import { connect } from 'react-redux';

import { getPages } from '../actions/getPages';
import Page from '../components/Page';

function mapStateToProps(state) {
  return {
    adverts: state.adverts,
    assets: state.assets,
    pages: state.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const PagesContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PagesContainer;
