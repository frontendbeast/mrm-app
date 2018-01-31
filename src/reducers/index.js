import { combineReducers } from 'redux';
import advertsReducer from './advertsReducer';
import assetsReducer from './assetsReducer';
import brotherClubsReducer from './brotherClubsReducer';
import eventsReducer from './eventsReducer';
import navReducer from './navReducer';
import navEventsReducer from './navEventsReducer';
import navTeamReducer from './navTeamReducer';
import pagesReducer from './pagesReducer';
import personsReducer from './personsReducer';
import settingsReducer from './settingsReducer';
import syncReducer from './syncReducer';
import venuesReducer from './venuesReducer';

const reducers = combineReducers({
  adverts: advertsReducer,
  assets: assetsReducer,
  brotherClubs: brotherClubsReducer,
  events: eventsReducer,
  nav: navReducer,
  navEvents: navEventsReducer,
  navTeam: navTeamReducer,
  pages: pagesReducer,
  persons: personsReducer,
  settings: settingsReducer,
  sync: syncReducer,
  venues: venuesReducer,
});

export default reducers;
