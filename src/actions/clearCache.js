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
    type: actionTypes.GetPagesRequested
  };
}

function clearCacheRejectedAction() {
  return {
    type: actionTypes.GetPagesRejected
  };
}

function clearCacheFulfilledAction(pages) {
  return {
    type: actionTypes.GetPagesFulfilled,
    pages
  };
}
