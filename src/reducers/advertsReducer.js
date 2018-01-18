import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const advertsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetAdvertsRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetAdvertsRejected: {
      return merge({}, state, { error: 'Error getting adverts', loading: false });
    }
    case actionTypes.GetAdvertsFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.adverts };
    }
    default:
      return state;
  }
};

export default advertsReducer;
