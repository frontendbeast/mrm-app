import actionTypes from '../constants/actionTypes';
import database from '../data/database';

export function getEvents() {
  return dispatch => {
    dispatch(getEventsRequestedAction());
    return database.ref('/events').once('value', snap => {
      const events = snap.val();
      dispatch(getEventsFulfilledAction(events));
    })
    .catch((error) => {
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
