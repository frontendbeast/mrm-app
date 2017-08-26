import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import navReducer from './navReducer';
import pagesReducer from './pagesReducer';
import venuesReducer from './venuesReducer';

const reducers = combineReducers({
  events: eventsReducer,
  nav: navReducer,
  pages: pagesReducer,
  venues: venuesReducer,
});

export default reducers;
