import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getPages() {
  return dispatch => {
    dispatch(getPagesRequestedAction());

    return cache
      .getAll('pages')
      .then(results => {
        dispatch(getPagesFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getPagesRejectedAction());
      });
  };
}

export function getPageByTitle(title) {
  return dispatch => {
    dispatch(getPageByTitleRequestedAction());

    return cache
      .getByAttribute('pages', 'title', title, 1)
      .then(results => {
        dispatch(getPageByTitleFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getPageByTitleRejectedAction());
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

function getPageByTitleRequestedAction() {
  return {
    type: actionTypes.GetPageByTitleRequested
  };
}

function getPageByTitleRejectedAction() {
  return {
    type: actionTypes.GetPageByTitleRejected
  };
}

function getPageByTitleFulfilledAction(pages) {
  return {
    type: actionTypes.GetPageByTitleFulfilled,
    pages
  };
}
