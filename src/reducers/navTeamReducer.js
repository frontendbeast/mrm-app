import { TeamNavigator } from '../navigators/TeamNavigator';

const navTeamReducer = (state, action) => {
  const newState = TeamNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export default navTeamReducer;
