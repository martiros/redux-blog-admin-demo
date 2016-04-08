import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore({});

const history = syncHistoryWithStore(browserHistory, store);

const root = (appStore, appRoutes) => (
  <div>
    <Provider store={appStore}>
      <div>
        <Router history={history}>
          {appRoutes}
        </Router>
      </div>
    </Provider>
  </div>
);

render(
  root(store, routes),
  document.getElementById('app')
);
