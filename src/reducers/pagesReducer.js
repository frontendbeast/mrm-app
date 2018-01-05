import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const pagesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetPagesRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetPagesRejected: {
      return merge({}, state, { error: 'Error getting page by ID', loading: false });
    }
    case actionTypes.GetPagesFulfilled: {
      return merge({}, state, { data: action.pages, error: false, loading: false });
    }
    default:
      return state;
  }
};

export default pagesReducer;
