import actionTypes from '../constants/actionTypes';
import cache from '../data/cache';

export function getPersons() {
  return dispatch => {
    dispatch(getPersonsRequestedAction());

    return cache
      .getByType('person')
      .then(results => {
        dispatch(getPersonsFulfilledAction(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(getPersonsRejectedAction());
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
