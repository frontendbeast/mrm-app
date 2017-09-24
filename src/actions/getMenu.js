import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getMenu() {
  return dispatch => {
    dispatch(getMenuRequestedAction());

    return cache
      .getMenu()
      .then(results => {
        dispatch(getMenuFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getMenuRejectedAction());
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
