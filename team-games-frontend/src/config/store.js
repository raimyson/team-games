import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../integration/reducers';

const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
  predicate: () => true // eslint-disable-line
});

let middlewares = [
  thunkMiddleware
];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

const composeEnhancers = composeWithDevTools({
  serialize: true
});

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../integration/reducers', () => {
      const nextRootReducer = require('../integration/reducers'); // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
