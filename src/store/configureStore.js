import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(initialState, browserHistory) {
  const routeMiddleware = routerMiddleware(browserHistory);

  const middlewareList = [];
  if (process.env.NODE_ENV !== 'production') {
    middlewareList.push(require('redux-immutable-state-invariant')());
  }

  middlewareList.push(thunkMiddleware);
  middlewareList.push(createLogger());
  middlewareList.push(routeMiddleware);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewareList)
  );
  return store;
}
