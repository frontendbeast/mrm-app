import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const syncReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SyncRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.SyncRejected: {
      return merge({}, state, { error: 'Error syncing', loading: false });
    }
    case actionTypes.SyncFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged };
    }
    default:
      return state;
  }
};

export default syncReducer;
