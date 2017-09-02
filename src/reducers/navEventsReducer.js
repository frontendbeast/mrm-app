import { EventsNavigator } from '../navigators/EventsNavigator';

const navEventsReducer = (state, action) => {
  const newState = EventsNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export default navEventsReducer;
