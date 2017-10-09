import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const pagesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetPageByIDRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetPageByIDRejected: {
      return merge({}, state, { error: 'Error getting page by ID', loading: false });
    }
    case actionTypes.GetPageByIDFulfilled: {
      return merge({}, state, { data: action.pages, error: false, loading: false });
    }
    default:
      return state;
  }
};

export default pagesReducer;
