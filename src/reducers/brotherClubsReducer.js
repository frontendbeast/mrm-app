import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const brotherClubsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetBrotherClubsRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetBrotherClubsRejected: {
      return merge({}, state, { error: 'Error getting brother clubs', loading: false });
    }
    case actionTypes.GetBrotherClubsFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.brotherClubs };
    }
    default:
      return state;
  }
};

export default brotherClubsReducer;
