import { connect } from 'react-redux';

import { getPages, getPageByTitle } from '../actions/getPages';
import Page from '../components/Page';

function mapStateToProps(state) {
  return {
    pages: state.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPages: () => dispatch(getPages()),
    onGetPageByTitle: (name) => dispatch(getPageByTitle(name)),
  };
}

const PagesContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PagesContainer;
