import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetEventsRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetEventsRejected: {
      return merge({}, state, { error: 'Error getting events', loading: false });
    }
    case actionTypes.GetEventsFulfilled: {
      return merge({}, state, { data: action.events, error: false, loading: false });
    }
    default:
      return state;
  }
};

export default eventsReducer;
