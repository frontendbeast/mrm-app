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

export function getEventByID(id) {
  return dispatch => {
    dispatch(getEventByIDRequestedAction());

    return cache
      .getByAttribute('events', 'id', id, 1)
      .then(results => {
        dispatch(getEventByIDFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getEventByIDRejectedAction());
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

function getEventByIDRequestedAction() {
  return {
    type: actionTypes.GetEventByIDRequested
  };
}

function getEventByIDRejectedAction() {
  return {
    type: actionTypes.GetEventByIDRejected
  };
}

function getEventByIDFulfilledAction(events) {
  return {
    type: actionTypes.GetEventByIDFulfilled,
    events
  };
}
