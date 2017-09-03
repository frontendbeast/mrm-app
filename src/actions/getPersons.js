import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getPersons() {
  return dispatch => {
    dispatch(getPersonsRequestedAction());

    return cache
      .getAll('persons')
      .then(results => {
        dispatch(getPersonsFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getPersonsRejectedAction());
      });
  };
}

export function getPersonByID(id) {
  return dispatch => {
    dispatch(getPersonByIDRequestedAction());

    return cache
      .getByAttribute('persons', 'id', id, 1)
      .then(results => {
        dispatch(getPersonByIDFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getPersonByIDRejectedAction());
      });
  };
}

function getPersonsRequestedAction() {
  return {
    type: actionTypes.GetPersonsRequested
  };
}

function getPersonsRejectedAction() {
  return {
    type: actionTypes.GetPersonsRejected
  };
}

function getPersonsFulfilledAction(persons) {
  return {
    type: actionTypes.GetPersonsFulfilled,
    persons
  };
}

function getPersonByIDRequestedAction() {
  return {
    type: actionTypes.GetPersonByIDRequested
  };
}

function getPersonByIDRejectedAction() {
  return {
    type: actionTypes.GetPersonByIDRejected
  };
}

function getPersonByIDFulfilledAction(persons) {
  return {
    type: actionTypes.GetPersonByIDFulfilled,
    persons
  };
}
