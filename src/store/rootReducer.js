import { combineReducers } from 'redux';

const staticReducers = {
  // For static reducers
}

const createRootReducer = (asyncReducers = {}) =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

export default createRootReducer;
