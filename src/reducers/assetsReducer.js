import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const assetsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetAssetsRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetAssetsRejected: {
      return merge({}, state, { error: 'Error getting assets', loading: false });
    }
    case actionTypes.GetAssetsFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.assets };
    }
    default:
      return state;
  }
};

export default assetsReducer;
