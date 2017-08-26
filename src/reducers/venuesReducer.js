import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const venuesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetVenuesRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetVenuesRejected: {
      return merge({}, state, { error: 'Error getting venues', loading: false });
    }
    case actionTypes.GetVenuesFulfilled: {
      return merge({}, state, { data: action.venues, error: false, loading: false });
    }
    default:
      return state;
  }
};

export default venuesReducer;
