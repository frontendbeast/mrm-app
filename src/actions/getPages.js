import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getPages() {
  return dispatch => {
    dispatch(getPagesRequestedAction());

    return cache
      .getByType('page')
      .then(results => {
        dispatch(getPagesFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getPagesRejectedAction());
      });
  };
}

function getPagesRequestedAction() {
  return {
    type: actionTypes.GetPagesRequested
  };
}

function getPagesRejectedAction() {
  return {
    type: actionTypes.GetPagesRejected
  };
}

function getPagesFulfilledAction(pages) {
  return {
    type: actionTypes.GetPagesFulfilled,
    pages
  };
}
