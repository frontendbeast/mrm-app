import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import navReducer from './navReducer';
import venuesReducer from './venuesReducer';

const reducers = combineReducers({
  events: eventsReducer,
  nav: navReducer,
  venues: venuesReducer,
});

export default reducers;
