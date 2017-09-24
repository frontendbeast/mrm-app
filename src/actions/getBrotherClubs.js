import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getBrotherClubs() {
  return dispatch => {
    dispatch(getBrotherClubsRequestedAction());

    return cache
      .getAll('brotherClubs')
      .then(results => {
        dispatch(getBrotherClubsFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getBrotherClubsRejectedAction());
      });
  };
}

function getBrotherClubsRequestedAction() {
  return {
    type: actionTypes.GetBrotherClubsRequested
  };
}

function getBrotherClubsRejectedAction() {
  return {
    type: actionTypes.GetBrotherClubsRejected
  };
}

function getBrotherClubsFulfilledAction(brotherClubs) {
  return {
    type: actionTypes.GetBrotherClubsFulfilled,
    brotherClubs
  };
}
