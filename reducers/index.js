import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import venuesReducer from './venuesReducer';

const reducers = combineReducers({
  events: eventsReducer,
  venues: venuesReducer,
});

export default reducers;
