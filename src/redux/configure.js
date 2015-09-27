import { compose, createStore } from 'redux';
import { Map } from 'immutable';
import rootReducer from './reducer';
import asyncMiddleware from 'redux-async-middleware';

export default (initialState = Map()) => {
  const middleware = [asyncMiddleware];

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const loggerMiddleware = require('redux-logger')({
      level: 'info',
      collapsed: false,
    });

    middleware.push(loggerMiddleware);
  }

  const applyMiddleware = __SERVER__ && !__DISABLE_SSR__ ?
    require('redux-universal') :
    require('redux').applyMiddleware;

  const storeEnhancers = __DEVELOPMENT__ && __DEVTOOLS__ ?
    compose(applyMiddleware(...middleware)) :
    applyMiddleware(...middleware);

  const finalCreateStore = storeEnhancers(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  if (__DEVELOPMENT__ && __CLIENT__ && module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
