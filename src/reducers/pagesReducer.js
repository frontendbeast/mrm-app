import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const pagesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetPagesRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetPagesRejected: {
      return merge({}, state, { error: 'Error getting pages', loading: false });
    }
    case actionTypes.GetPagesFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.pages };
    }
    case actionTypes.GetPageByTitleRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetPageByTitleRejected: {
      return merge({}, state, { error: 'Error getting page by title', loading: false });
    }
    case actionTypes.GetPageByTitleFulfilled: {
      return merge({}, state, { data: action.pages, error: false, loading: false });
    }
    default:
      return state;
  }
};

export default pagesReducer;
