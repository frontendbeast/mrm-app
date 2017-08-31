import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function clearCache(node, field, value) {
  return dispatch => {
    dispatch(clearCacheRequestedAction());

    return cache
      .clear(node, field, value)
      .then(results => {
        dispatch(clearCacheFulfilledAction());
      })
      .catch(error => {
        console.log(error);
        dispatch(clearCacheRejectedAction());
      });
  };
}

function clearCacheRequestedAction() {
  return {
    type: actionTypes.ClearCacheRequested
  };
}

function clearCacheRejectedAction() {
  return {
    type: actionTypes.ClearCacheRejected
  };
}

function clearCacheFulfilledAction(pages) {
  return {
    type: actionTypes.ClearCacheFulfilled,
    pages
  };
}
