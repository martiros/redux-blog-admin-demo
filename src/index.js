import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore({}, browserHistory);

syncHistoryWithStore(browserHistory, store);

const root = (appStore, appRoutes, appBrowserHistory) => (
  // eslint-disable-next-line
  <div>
    <Provider store={appStore}>
      <Router history={appBrowserHistory}>
        {appRoutes}
      </Router>
    </Provider>
  </div>
);

render(
  root(store, routes, browserHistory),
  document.getElementById('app')
);
