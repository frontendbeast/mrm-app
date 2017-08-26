import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getEvents() {
  return dispatch => {
    dispatch(getEventsRequestedAction());

    return cache
      .getAll('events')
      .then(results => {
        dispatch(getEventsFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getEventsRejectedAction());
      });
  };
}

function getEventsRequestedAction() {
  return {
    type: actionTypes.GetEventsRequested
  };
}

function getEventsRejectedAction() {
  return {
    type: actionTypes.GetEventsRejected
  };
}

function getEventsFulfilledAction(events) {
  return {
    type: actionTypes.GetEventsFulfilled,
    events
  };
}
