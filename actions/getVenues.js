import actionTypes from '../constants/actionTypes';
import database from '../data/database';

export function getVenues() {
  return dispatch => {
    dispatch(getVenuesRequestedAction());
    return database.ref('/venues').once('value', snap => {
      const venues = snap.val();
      dispatch(getVenuesFulfilledAction(venues));
    })
    .catch((error) => {
      console.log(error);
      dispatch(getVenuesRejectedAction());
    });
  };
}

function getVenuesRequestedAction() {
  return {
    type: actionTypes.GetVenuesRequested
  };
}

function getVenuesRejectedAction() {
  return {
    type: actionTypes.GetVenuesRejected
  };
}

function getVenuesFulfilledAction(venues) {
  return {
    type: actionTypes.GetVenuesFulfilled,
    venues
  };
}
