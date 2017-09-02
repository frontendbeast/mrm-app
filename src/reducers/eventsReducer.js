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
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.events };
    }
    case actionTypes.GetEventByIDRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetEventByIDRejected: {
      return merge({}, state, { error: 'Error getting event by ID', loading: false });
    }
    case actionTypes.GetEventByIDFulfilled: {
      return merge({}, state, { data: action.events, error: false, loading: false });
    }
    default:
      return state;
  }
};

export default eventsReducer;
