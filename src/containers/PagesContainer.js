import { connect } from 'react-redux';

import { getPageByID } from '../actions/getPages';
import Page from '../components/Page';

function mapStateToProps(state) {
  return {
    pages: state.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPageByID: (id) => dispatch(getPageByID(id)),
  };
}

const PagesContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PagesContainer;
