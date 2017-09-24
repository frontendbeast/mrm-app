import { combineReducers } from 'redux';
import brotherClubsReducer from './brotherClubsReducer';
import eventsReducer from './eventsReducer';
import navReducer from './navReducer';
import navEventsReducer from './navEventsReducer';
import navTeamReducer from './navTeamReducer';
import pagesReducer from './pagesReducer';
import personsReducer from './personsReducer';
import venuesReducer from './venuesReducer';

const reducers = combineReducers({
  brotherClubs: brotherClubsReducer,
  events: eventsReducer,
  nav: navReducer,
  navEvents: navEventsReducer,
  navTeam: navTeamReducer,
  pages: pagesReducer,
  persons: personsReducer,
  venues: venuesReducer,
});

export default reducers;
