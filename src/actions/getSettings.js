import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getSettings() {
  return dispatch => {
    dispatch(getSettingsRequestedAction());

    return cache
      .getByType('settings')
      .then(results => {
        dispatch(getSettingsFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getSettingsRejectedAction());
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
