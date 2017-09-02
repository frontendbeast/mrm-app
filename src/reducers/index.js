import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import navReducer from './navReducer';
import navEventsReducer from './navEventsReducer';
import pagesReducer from './pagesReducer';
import venuesReducer from './venuesReducer';

const reducers = combineReducers({
  events: eventsReducer,
  nav: navReducer,
  navEvents: navEventsReducer,
  pages: pagesReducer,
  venues: venuesReducer,
});

export default reducers;
