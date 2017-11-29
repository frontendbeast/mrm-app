import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getVenues() {
  return dispatch => {
    dispatch(getVenuesRequestedAction());

    return cache
      .get('venues')
      .then(results => {
        dispatch(getVenuesFulfilledAction(results));
      })
      .catch(error => {
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
