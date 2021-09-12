import { combineReducers } from 'redux';
import {asyncActionWatcherReducer} from './asyncActionWatcher'
const staticReducers = {
  asyncActionWatcher: asyncActionWatcherReducer
}

const createRootReducer = (asyncReducers = {}) =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

export default createRootReducer;
