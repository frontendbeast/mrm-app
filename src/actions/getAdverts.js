import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getAdverts() {
  return dispatch => {
    dispatch(getAdvertsRequestedAction());

    return cache
      .getByType('advert')
      .then(results => {
        console.log('ad success', results);
        dispatch(getAdvertsFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getAdvertsRejectedAction());
      });
  };
}

function getAdvertsRequestedAction() {
  return {
    type: actionTypes.GetAdvertsRequested
  };
}

function getAdvertsRejectedAction() {
  return {
    type: actionTypes.GetAdvertsRejected
  };
}

function getAdvertsFulfilledAction(adverts) {
  return {
    type: actionTypes.GetAdvertsFulfilled,
    adverts
  };
}
