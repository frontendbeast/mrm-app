import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getSettings() {
  return dispatch => {
    dispatch(getSettingsRequestedAction());

    return Promise
      .all([cache.clear('pageList'), cache.clear('settings')])
      .then(() => {
        return cache
          .getSettings()
          .then(results => {
            dispatch(getSettingsFulfilledAction(results));
          })
          .catch(error => {
            console.log(error);
            dispatch(getSettingsRejectedAction());
          });
      });

  };
}

export function getSettingsCache() {
  return dispatch => {
    dispatch(getSettingsCacheRequestedAction());

    return cache
      .getSettingsCache()
      .then(results => {
        dispatch(getSettingsCacheFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getSettingsCacheRejectedAction());
      });
  };
}

function getSettingsRequestedAction() {
  return {
    type: actionTypes.GetSettingsRequested
  };
}

function getSettingsRejectedAction() {
  return {
    type: actionTypes.GetSettingsRejected
  };
}

function getSettingsFulfilledAction(settings) {
  return {
    type: actionTypes.GetSettingsFulfilled,
    settings
  };
}

function getSettingsCacheRequestedAction() {
  return {
    type: actionTypes.GetSettingsCacheRequested
  };
}

function getSettingsCacheRejectedAction() {
  return {
    type: actionTypes.GetSettingsCacheRejected
  };
}

function getSettingsCacheFulfilledAction(settings) {
  return {
    type: actionTypes.GetSettingsCacheFulfilled,
    settings
  };
}
