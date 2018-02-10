import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import tracking from './tracking';

const store = createStore(reducers, {}, applyMiddleware(thunk, tracking));

export default store;
