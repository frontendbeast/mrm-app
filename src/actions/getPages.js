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
