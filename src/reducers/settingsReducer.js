import { merge } from 'lodash';

import actionTypes from '../constants/actionTypes';

const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GetSettingsRequested: {
      return merge({}, state, { loading: true });
    }
    case actionTypes.GetSettingsRejected: {
      return merge({}, state, { error: 'Error getting settings', loading: false });
    }
    case actionTypes.GetSettingsFulfilled: {
      const merged =  merge({}, state, { error: false, loading: false });
      return { ...merged, data: action.settings };
    }
    default:
      return state;
  }
};

export default settingsReducer;
