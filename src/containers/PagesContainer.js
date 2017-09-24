import { connect } from 'react-redux';

import { getPages, getPageByID, getPageByTitle } from '../actions/getPages';
import Page from '../components/Page';

function mapStateToProps(state) {
  return {
    pages: state.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPages: () => dispatch(getPages()),
    onGetPageByID: (id) => dispatch(getPageByID(id)),
    onGetPageByTitle: (title) => dispatch(getPageByTitle(title)),
  };
}

const PagesContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PagesContainer;
