import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function sync() {
  return dispatch => {
    dispatch(syncRequestedAction());

    return cache
      .sync()
      .then(() => {
        dispatch(syncFulfilledAction());
      })
      .catch(error => {
        console.log(error);
        dispatch(syncRejectedAction());
      });

  };
}


function syncRequestedAction() {
  return {
    type: actionTypes.SyncRequested
  };
}

function syncRejectedAction() {
  return {
    type: actionTypes.SyncRejected
  };
}

function syncFulfilledAction(data) {
  return {
    type: actionTypes.SyncFulfilled,
    data
  };
}
