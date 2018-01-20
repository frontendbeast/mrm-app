import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

import { getAdverts } from './getAdverts';
import { getAssets } from './getAssets';
import { getBrotherClubs } from './getBrotherClubs';
import { getEvents } from './getEvents';
import { getPages } from './getPages';
import { getPersons } from './getPersons';
import { getSettings } from './getSettings';
import { getVenues } from './getVenues';

export function sync() {
  return dispatch => {
    dispatch(syncRequestedAction());

    return cache
      .sync()
      .then(results => {
        dispatch(syncFulfilledAction());

        if (results.includes('advert')) {
          dispatch(getAdverts());
        }

        if (results.includes('asset')) {
          dispatch(getAssets());
        }

        if (results.includes('brotherClub')) {
          dispatch(getBrotherClubs());
        }

        if (results.includes('event')) {
          dispatch(getEvents());
        }

        if (results.includes('page')) {
          dispatch(getPages());
        }

        if (results.includes('person')) {
          dispatch(getPersons());
        }

        if (results.includes('settings')) {
          dispatch(getSettings());
        }

        if (results.includes('venue')) {
          dispatch(getVenues());
        }

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
