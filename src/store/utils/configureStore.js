import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from '../rootReducer'

const configureStore = (initialState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancers = composeEnhancers(applyMiddleware(thunk))
  const store = createStore(createRootReducer(), initialState, enhancers)

  store.loadedAsyncReducer = {}

  // This function using for hot load reducer (code splitting)
  store.injectReducer = (key, asyncReducer) => {
    // Don't allow to inject duplicated reducer
    if (store.loadedAsyncReducer[key]) {
      return false
    }

    store.loadedAsyncReducer[key] = asyncReducer
    store.replaceReducer(createRootReducer(store.loadedAsyncReducer))
  }

  return store
}

export default configureStore
