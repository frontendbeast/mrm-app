import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getMenu() {
  return dispatch => {
    dispatch(getMenuRequestedAction());

    return cache
      .clear('menus')
      .then(() => {
        return cache
          .getMenu()
          .then(results => {
            dispatch(getMenuFulfilledAction(results));
          })
          .catch(error => {
            console.log(error);
            dispatch(getMenuRejectedAction());
          });
      })
      .catch(error => {
        console.log(error);
        dispatch(getMenuRejectedAction());
      });

  };
}

export function getMenuCache() {
  return dispatch => {
    dispatch(getMenuCacheRequestedAction());

    return cache
      .getMenuCache()
      .then(results => {
        dispatch(getMenuCacheFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getMenuCacheRejectedAction());
      });
  };
}

function getMenuRequestedAction() {
  return {
    type: actionTypes.GetMenuRequested
  };
}

function getMenuRejectedAction() {
  return {
    type: actionTypes.GetMenuRejected
  };
}

function getMenuFulfilledAction(menu) {
  return {
    type: actionTypes.GetMenuFulfilled,
    menu
  };
}

function getMenuCacheRequestedAction() {
  return {
    type: actionTypes.GetMenuRequested
  };
}

function getMenuCacheRejectedAction() {
  return {
    type: actionTypes.GetMenuRejected
  };
}

function getMenuCacheFulfilledAction(menu) {
  return {
    type: actionTypes.GetMenuFulfilled,
    menu
  };
}
