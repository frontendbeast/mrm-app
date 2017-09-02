import { AppNavigator } from '../navigators/AppNavigator';

const navReducer = (state, action) => {
  switch (action.type) {
    case 'Navigation/BACK':
      return state;
    default:
      const newState = AppNavigator.router.getStateForAction(action, state);
      return newState || state;
  }
};

export default navReducer;
