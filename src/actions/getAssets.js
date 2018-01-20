import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getAssets() {
  return dispatch => {
    dispatch(getAssetsRequestedAction());

    return cache
      .getByType('asset')
      .then(results => {
        dispatch(getAssetsFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getAssetsRejectedAction());
      });
  };
}

function getAssetsRequestedAction() {
  return {
    type: actionTypes.GetAssetsRequested
  };
}

function getAssetsRejectedAction() {
  return {
    type: actionTypes.GetAssetsRejected
  };
}

function getAssetsFulfilledAction(assets) {
  return {
    type: actionTypes.GetAssetsFulfilled,
    assets
  };
}
