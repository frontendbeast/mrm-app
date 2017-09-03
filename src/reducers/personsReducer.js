import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const personsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetPersonsRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetPersonsRejected: {
      return merge({}, state, { error: 'Error getting persons', loading: false });
    }
    case actionTypes.GetPersonsFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.persons };
    }
    case actionTypes.GetPersonByIDRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetPersonByIDRejected: {
      return merge({}, state, { error: 'Error getting person by ID', loading: false });
    }
    case actionTypes.GetPersonByIDFulfilled: {
      return merge({}, state, { data: action.persons, error: false, loading: false });
    }
    default:
      return state;
  }
};

export default personsReducer;
