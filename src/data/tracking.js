import { NavigationActions } from 'react-navigation';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import actionTypes from '../constants/actionTypes';

const tracker = new GoogleAnalyticsTracker('UA-10680709-10');

const tracking = ({ getState }) => next => (action) => {
  if(action.type === actionTypes.TrackAdvertClick) {
    tracker.trackEvent('Advert', 'Click', { label: action.advert });
  } else if(action.type === actionTypes.TrackAdvertView) {
    tracker.trackEvent('Advert', 'View', { label: action.advert });
  } else if(action.type === actionTypes.TrackException) {
    tracker.trackException(action.error, false);
  } else if(action.type === actionTypes.TrackScreenView) {
    tracker.trackScreenView(action.screen);
  }

  return next(action);
};

export default tracking;
