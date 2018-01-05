import { connect } from 'react-redux';

import { getPages } from '../actions/getPages';
import Page from '../components/Page';

function mapStateToProps(state) {
  return {
    pages: state.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPages: () => dispatch(getPages()),
  };
}

const PagesContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PagesContainer;
