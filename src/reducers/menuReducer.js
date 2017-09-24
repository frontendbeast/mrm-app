import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const menuReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetMenuRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetMenuRejected: {
      return merge({}, state, { error: 'Error getting menu', loading: false });
    }
    case actionTypes.GetMenuFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.menu };
    }
    default:
      return state;
  }
};

export default menuReducer;
