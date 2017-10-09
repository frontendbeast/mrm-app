import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getPageByID(id) {
  return dispatch => {
    dispatch(getPageByIDRequestedAction());

    return cache
      .getByAttribute('pages', 'id', id, 1)
      .then(results => {
        dispatch(getPageByIDFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getPageByIDRejectedAction());
      });
  };
}

function getPageByIDRequestedAction() {
  return {
    type: actionTypes.GetPageByIDRequested
  };
}

function getPageByIDRejectedAction() {
  return {
    type: actionTypes.GetPageByIDRejected
  };
}

function getPageByIDFulfilledAction(pages) {
  return {
    type: actionTypes.GetPageByIDFulfilled,
    pages
  };
}
